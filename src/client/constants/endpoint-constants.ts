
export const Endpoints = {

    COMMS:"/comms",
    CMS_CONTENTS:"/cmscontents",
    USERS:"/users",
    GET_BOOKMARKED_CONTENT: "/comms/cmscontents?action=Bookmark",
    CONTENT_DETAILS: "/comms/cmscontents/{id}/details",
    CONTENT_ATTACHMENTS: "/comms/cmscontents/{id}/attachments",
    BOOKMARK_CONTENT: "/comms/cmscontents/{id}?action=Bookmark",
    ACKNOWLEDGE_CONTENT: "/comms/cmscontents/{id}?action=Acknowledge",
    LIKE_CONTENT: "/comms/cmscontents/{id}?action=Like",
    DISLIKE_CONTENT: "/comms/cmscontents/{id}?action=Dislike",
};