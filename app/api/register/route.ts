import bcrypt from "bcrypt"
import prismaClient from '@/libs/prismadb';

import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const body = await request.json();

        const {
            email,
            name,
            password
        } = body;

        if (!email || !name || !password) {
            return new NextResponse('Missing Information', {
                status: 400
            })
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const user = await prismaClient.user.create({
            data: {
                email,
                hashedPassword,
                name,
            }
        })

        return NextResponse.json(user)
    } catch (err: any) {
        console.error(err, "REGISTRATION ERROR")
        return new NextResponse("Internal Error", { status: 500 })
    }
}