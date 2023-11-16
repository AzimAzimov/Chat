import getCurrentUser from "../actions/getCurrentUser";
import prisma from "../../app/libs/prismadb";
import { NextResponse } from "next/server";
import { number } from "prop-types";

export async function POST(request: Request) {
  try {
    const currentUser = await getCurrentUser();
    const body = await request.json();
    const { userId, isGroup, members, name } = body;

    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse("АВТАРОЗУЙСЯ!", { status: 401 });
    }

    if (isGroup && (!members || members.length() < 2 || !name)) {
      return new NextResponse("Кревая DATA", { status: 400 });
    }

    if (isGroup) {
      const newConverstation = await prisma.conversation.create({
        data: {
          name,
          isGroup,
          users: {
            connect: [
              ...members.map((number: { value: string }) => ({
                id: members.value,
              })),
              {
                id: currentUser.id,
              },
            ],
          },
        },
        include: {
          users: true,
        },
      });
      return NextResponse.json(newConverstation);
    }
  } catch (error: any) {
    return new NextResponse("Ошибка на странице Conversation", { status: 500 });
  }
}
