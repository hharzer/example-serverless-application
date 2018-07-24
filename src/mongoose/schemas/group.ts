import { Chance } from "chance";
import * as mongoose from "mongoose";

import { GroupDocument, User } from "../";

const schema = new mongoose.Schema({
  isPrivate: {
    default: false,
    type: Boolean
  },
  name: String,
  ownerId: {
    required: true,
    type: mongoose.Schema.Types.ObjectId
  },
  userIds: [mongoose.Schema.Types.ObjectId]
}, {
  autoIndex: false,
  timestamps: true
});

/**
 * Creates a record with randomized required parameters if not specified.
 * @param {Object} params The parameters to initialize the record with.
 */
schema.statics.mock = async function(params?: any): Promise<GroupDocument> {
  const chance = new Chance();

  params = params || {};
  if (!params.ownerId) {
    const user = await User.mock();
    params.ownerId = user._id;
  }

  return this.create(params);
};

export const GroupSchema = schema;