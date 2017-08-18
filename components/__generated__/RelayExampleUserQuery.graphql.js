/**
 * @flow
 * @relayHash c17cae3fa3f31116f70c503a2277f27f
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteBatch} from 'relay-runtime';
export type RelayExampleUserQueryResponse = {|
  +user: ?{|
    +id: string;
    +email: ?string;
    +fullName: ?string;
    +posts: ?{| |};
  |};
|};
*/


/*
query RelayExampleUserQuery {
  user(id: 1) {
    id
    email
    fullName
    posts {
      ...PostList_posts
    }
  }
}

fragment PostList_posts on PostConnection {
  edges {
    node {
      body
      id
      likes
    }
  }
}
*/

const batch /*: ConcreteBatch*/ = {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "RelayExampleUserQuery",
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "args": [
          {
            "kind": "Literal",
            "name": "id",
            "value": 1,
            "type": "Int"
          }
        ],
        "concreteType": "User",
        "name": "user",
        "plural": false,
        "selections": [
          {
            "kind": "ScalarField",
            "alias": null,
            "args": null,
            "name": "id",
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "args": null,
            "name": "email",
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "args": null,
            "name": "fullName",
            "storageKey": null
          },
          {
            "kind": "LinkedField",
            "alias": null,
            "args": null,
            "concreteType": "PostConnection",
            "name": "posts",
            "plural": false,
            "selections": [
              {
                "kind": "FragmentSpread",
                "name": "PostList_posts",
                "args": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": "user{\"id\":1}"
      }
    ],
    "type": "Query"
  },
  "id": null,
  "kind": "Batch",
  "metadata": {},
  "name": "RelayExampleUserQuery",
  "query": {
    "argumentDefinitions": [],
    "kind": "Root",
    "name": "RelayExampleUserQuery",
    "operation": "query",
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "args": [
          {
            "kind": "Literal",
            "name": "id",
            "value": 1,
            "type": "Int"
          }
        ],
        "concreteType": "User",
        "name": "user",
        "plural": false,
        "selections": [
          {
            "kind": "ScalarField",
            "alias": null,
            "args": null,
            "name": "id",
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "args": null,
            "name": "email",
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "args": null,
            "name": "fullName",
            "storageKey": null
          },
          {
            "kind": "LinkedField",
            "alias": null,
            "args": null,
            "concreteType": "PostConnection",
            "name": "posts",
            "plural": false,
            "selections": [
              {
                "kind": "LinkedField",
                "alias": null,
                "args": null,
                "concreteType": "PostEdge",
                "name": "edges",
                "plural": true,
                "selections": [
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "args": null,
                    "concreteType": "Post",
                    "name": "node",
                    "plural": false,
                    "selections": [
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "args": null,
                        "name": "body",
                        "storageKey": null
                      },
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "args": null,
                        "name": "id",
                        "storageKey": null
                      },
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "args": null,
                        "name": "likes",
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": "user{\"id\":1}"
      }
    ]
  },
  "text": "query RelayExampleUserQuery {\n  user(id: 1) {\n    id\n    email\n    fullName\n    posts {\n      ...PostList_posts\n    }\n  }\n}\n\nfragment PostList_posts on PostConnection {\n  edges {\n    node {\n      body\n      id\n      likes\n    }\n  }\n}\n"
};

module.exports = batch;
