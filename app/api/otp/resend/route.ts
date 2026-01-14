import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { sendOTPEmail } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email requis' },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      return NextResponse.json(
        { error: 'Utilisateur non trouvé' },
        { status: 404 }
      );
    }

    const emailResult = await sendOTPEmail(email);

    if (!emailResult.success) {
      return NextResponse.json(
        { error: 'Erreur lors de l\'envoi de l\'email' },
        { status: 500 }
      );
    }

    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + 10);

    await prisma.otpCode.deleteMany({
      where: {
        email,
        verified: false
      }
    });

    await prisma.otpCode.create({
      data: {
        email,
        code: emailResult.token,
        expiresAt,
      }
    });

    return NextResponse.json({
      success: true,
      message: 'Code OTP renvoyé avec succès'
    });

  } catch (error) {
    console.error('Erreur lors du renvoi de l\'OTP:', error);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}
