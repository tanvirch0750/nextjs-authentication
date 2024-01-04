'use server';

import { RegisterSchema } from '@/schemas';
import * as z from 'zod';
import bcrypt from 'bcryptjs'; // if this cause problem use bcryptjs
import { db } from '@/lib/db';
import { getUserByEmail } from '@/data/user';
import { generateVerificationToken } from '@/lib/token';
import { sendVerificationEmail } from '@/lib/mail';

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validateFields = RegisterSchema.safeParse(values);

  if (!validateFields.success) {
    return { error: 'Invalid fields' };
  }

  const { email, password, name } = validateFields.data;

  const hashPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: 'Email already in use!' };
  }

  await db.user.create({
    data: {
      name,
      email,
      password: hashPassword,
    },
  });

  const verficationToken = await generateVerificationToken(email);

  await sendVerificationEmail(verficationToken.email, verficationToken.token);

  return { success: 'Confirmation email sent!' };
};
