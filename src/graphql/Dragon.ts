import axios from 'axios';
import { extendType, objectType } from "nexus";

const fetchDragons = async () => {
  const response = await axios.get('https://api.spacexdata.com/v3/dragons');
  return response.data
}

export const Dragon = objectType({
  name: "Dragon",
  definition(t) {
    t.nonNull.string("id");
    t.nonNull.string("name");
    t.nullable.string("capsule");
    t.nonNull.boolean("active");
    t.nonNull.int("crew_capacity");
  }
});

export const DragonQuery = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.list.nonNull.field("dragons", {
      type: Dragon,
      resolve() {
        return fetchDragons()
      }
    })
  }
})