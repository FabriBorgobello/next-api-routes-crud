// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import USERS from "@/mocks/users";
import { User } from "@/types";
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<User | User[]>
) {
  switch (req.method) {
    case "GET":
      getUsers();
      break;
    case "POST":
      createUser(req.body);
      break;
    default:
      res.status(405).end();
  }

  /* LIST */
  function getUsers() {
    res.status(200).json(USERS);
  }

  /* POST */
  function createUser(user: Partial<User>) {
    const newUser = {
      id: USERS.length + 1,
      name: user.name ?? "",
      username: user.username ?? "",
      email: user.email ?? "",
      phone: user.phone ?? "",
      website: user.website ?? "",
    };
    USERS.push(newUser);
    return res.status(201).json(newUser);
  }
}
