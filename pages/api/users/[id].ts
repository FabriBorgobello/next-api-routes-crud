// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import USERS from "@/mocks/users";
import { User } from "@/types";
import type { NextApiRequest, NextApiResponse } from "next";
import invariant from "tiny-invariant";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<User>
) {
  switch (req.method) {
    case "GET":
      invariant(typeof req.query.id === "string", "id must be a string");
      getUserById(req.query.id);
      break;
    case "PUT":
      invariant(typeof req.query.id === "string", "id must be a string");
      updateUser(req.query.id, req.body);
      break;
    case "PATCH":
      invariant(typeof req.query.id === "string", "id must be a string");
      updateUserPartial(req.query.id, req.body);
      break;
    case "DELETE":
      invariant(typeof req.query.id === "string", "id must be a string");
      deleteUser(req.query.id);
      break;
    default:
      res.status(405).end();
  }

  /* GET */
  function getUserById(id: string) {
    const user = USERS.find((user) => user.id === Number(id));
    if (user) {
      return res.status(200).json(user);
    }
    return res.status(404).end();
  }

  /* PUT */
  function updateUser(id: string, user: User) {
    const index = USERS.findIndex((u) => u.id === Number(id));
    if (index === -1) {
      return res.status(404).end();
    }
    USERS[index] = user;
    return res.status(200).json(user);
  }

  /* PATCH */
  function updateUserPartial(id: string, user: Partial<User>) {
    const index = USERS.findIndex((u) => u.id === Number(id));
    if (index === -1) {
      return res.status(404).end();
    }
    USERS[index] = { ...USERS[index], ...user };
    return res.status(200).json(USERS[index]);
  }

  /* DELETE */
  function deleteUser(id: string) {
    const index = USERS.findIndex((u) => u.id === Number(id));
    if (index === -1) {
      return res.status(404).end();
    }
    USERS.splice(index, 1);
    return res.status(204).end();
  }
}
