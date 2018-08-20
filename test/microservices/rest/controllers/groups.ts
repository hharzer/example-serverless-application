import { expect } from "chai";
import { Context } from "koa";

import { GroupsController } from "../../../../src/microservices/rest/controllers";
import { Group, GroupDocument, User, UserDocument } from "../../../../src/common/mongo";

const groupsController = new GroupsController();

describe("microservices/rest/controllers/groups.ts", function() {
  let group: GroupDocument;
  let user: UserDocument;

  beforeEach(async function() {
    group = await Group.mock();
    user = await User.mock({ level: 1 });
  });

  describe("addUserIds()", function() {
    it("returns the updated group", async function() {
      const ctx = {
        params: {
          id: group.id,
          userIds: user.id + "," + user.id
        },
        state: { user }
      } as Context;

      await groupsController.addUserIds(ctx);

      expect(ctx.body.record.userIds).to.contain(user._id);
    });
  });

  describe("count()", function() {
    it("returns the number of groups matching the criteria", async function() {
      const ctx = {
        query: {},
        state: { user }
      } as Context;

      await groupsController.count(ctx);

      expect(ctx.body.count).to.eql(1);
    });
  });

  describe("create()", function() {
    it("creates a new group", async function() {
      const ctx = {
        request: {
          body: {
            isPrivate: true
          }
        },
        state: { user }
      } as Context;

      await groupsController.create(ctx);

      expect(ctx.body.record).to.exist;
    });
  });

  describe("find()", function() {
    it("returns all groups", async function() {
      const ctx = {
        query: {},
        state: { user }
      } as Context;

      await groupsController.find(ctx);

      expect(ctx.body.records.length).to.eql(1);
    });
  });

  describe("findOne()", function() {
    it("returns the group", async function() {
      const ctx = {
        params: {
          id: group._id
        },
        state: { user }
      } as Context;

      await groupsController.findOne(ctx);

      expect(ctx.body.record).to.exist;
    });
  });

  describe("remove()", function() {
    it("returns the removed group", async function() {
      const ctx = {
        params: {
          id: group._id
        },
        state: { user }
      } as Context;

      await groupsController.remove(ctx);

      expect(ctx.body.record).to.exist;
    });
  });

  describe("removeAllUserIds()", function() {
    it("returns the updated group", async function() {
      group.userIds = [user._id];
      group = await group.save();

      const ctx = {
        params: {
          id: group.id
        },
        state: { user }
      } as Context;

      await groupsController.removeAllUserIds(ctx);

      expect(ctx.body.record.userIds).to.not.contain(user._id);
    });
  });

  describe("removeUserIds()", function() {
    it("returns the updated group", async function() {
      group.userIds = [user._id];
      group = await group.save();

      const ctx = {
        params: {
          id: group.id,
          userIds: user.id + "," + user.id
        },
        state: { user }
      } as Context;

      await groupsController.removeUserIds(ctx);

      expect(ctx.body.record.userIds).to.not.contain(user._id);
    });
  });

  describe("update()", function() {
    it("updates and returns the group", async function() {
      const ctx = {
        params: {
          id: group._id
        },
        request: {
          body: {
            isPrivate: true
          }
        },
        state: { user }
      } as Context;

      await groupsController.findOne(ctx);

      expect(ctx.body.record).to.exist;
    });
  });
});