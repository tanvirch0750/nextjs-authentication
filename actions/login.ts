'use server';

import bcrypt from 'bcryptjs';
import { LoginSchema } from '@/schemas';
import { signIn } from '@/auth';
import * as z from 'zod';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';
import { AuthError } from 'next-auth';
import { getUserByEmail } from '@/data/user';
import { generateVerificationToken } from '@/lib/token';
import { sendVerificationEmail } from '@/lib/mail';

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validateFields = LoginSchema.safeParse(values);

  if (!validateFields.success) {
    return { error: 'Invalid fields' };
  }

  const { email, password } = validateFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: 'Credential does not match' };
  }

  if (existingUser) {
    const passwordMatch = await bcrypt.compare(
      password,
      existingUser.password!
    );
    if (!passwordMatch) {
      return { error: 'Password does not match' };
    }
  }

  if (!existingUser.emailVerified) {
    const verficationToken = await generateVerificationToken(
      existingUser.email
    );

    await sendVerificationEmail(verficationToken.email, verficationToken.token);

    return { success: 'Confirmation email sent' };
  }

  try {
    await signIn('credentials', {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { error: 'Invalid Credentials' };
        default:
          return { error: 'Something Went Wrong' };
      }
    }
    throw error;
  }
};
