import axios from 'axios';
import { extendType, intArg, nullable, objectType } from "nexus";

const fetchCharacters = async ({ page }: { page: number | null | undefined }) => {
  const response = await axios.get(`https://rickandmortyapi.com/api/character?page=${page}`);
  return response.data.results
}

export const Origin = objectType({
  name: 'Origin',
  definition(t) {
    t.nonNull.string("name");
    t.nonNull.string("url");
  }
})

export const Location = objectType({
  name: 'Location',
  definition(t) {
    t.nonNull.string("name");
    t.nonNull.string("url");
  }
})

export const Character = objectType({
  name: "Character",
  definition(t) {
    t.nonNull.int("id");
    t.nonNull.string("name");
    t.nonNull.string("status");
    t.nonNull.string("species");
    t.nonNull.string("gender");
    t.nonNull.field("origin", {
      type: Origin,
    });
    t.nonNull.field("location", {
      type: Location
    });
    t.nonNull.string("image");
  },
});

export const CharacterQuery = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.list.nonNull.field("characters", {
      type: "Character",
      args: {
        page: nullable(intArg())
      },
      resolve(parent, args, context, info) {
        const { page } = args;
        return fetchCharacters({ page: page });
      },
    });
  },
});