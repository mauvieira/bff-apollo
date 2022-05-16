import { extendType, objectType } from "nexus";

const links = [
  {
    id: 1,
    url: "www.howtographql.com",
    description: "Fullstack tutorial for GraphQL",
  },
  {
    id: 2,
    url: "graphql.org",
    description: "GraphQL official website",
  },
];

export const Link = objectType({
  name: "Link",
  definition(t) {
    t.nonNull.int("id");
    t.nonNull.string("description");
    t.nonNull.string("url");
  },
});

export const LinkQuery = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.list.nonNull.field("feed", {
      type: "Link",
      resolve(parent, args, context, info) {
        return links;
      },
    });
  },
});