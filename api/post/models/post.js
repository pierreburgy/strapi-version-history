"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#lifecycle-hooks)
 * to customize this model
 */

const savePostReview = async (params, data) => {
  const postReview = {
    ...data,
    post: params.id,
  };

  const postReviewCreated = await strapi.services["post-review"].create(
    postReview
  );
  return postReviewCreated;
};

module.exports = {
  lifecycles: {
    async beforeUpdate(params, data) {
      const postReviewCreated = await savePostReview(params, data);
      if (data.post_reviews) {
        data.post_reviews.push(postReviewCreated.id);
      }
    },

    async afterCreate(params, data) {
      const postReviewCreated = await savePostReview(params, data);
      if (data.post_reviews) {
        data.post_reviews.push(postReviewCreated.id);
      }
    },
  },
};
