"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async rollback(ctx) {
    const postReviewId = ctx.request.body.id;
    if (!postReviewId) {
      ctx.throw(400, "id field missing.");
    }

    const postReview = await strapi
      .query("post-review")
      .findOne({ id: postReviewId }, []);

    const updatedPost = await strapi
      .query("post")
      .update({ id: postReview.post }, postReview);

    return updatedPost;
  },
};
