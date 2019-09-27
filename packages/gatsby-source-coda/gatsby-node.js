const crypto = require('crypto');
const fetch = require('node-fetch');
const queryString = require('query-string');
require('dotenv').config();

exports.sourceNodes = async ({ actions }, { apiToken, docId, tableIdOrName, useColumnNames }) => {
    if (!apiToken) {
        return;
    }

    const { createNode } = actions;

    const qs = queryString.stringify({
        useColumnNames,
    });

    let listRowsRes;

    try {
        listRowsRes = await fetch(
            // https://coda.io/developers/apis/v1beta1#operation/listRows
            `https://coda.io/apis/v1beta1/docs/${docId}/tables/${tableIdOrName}/rows?${qs}`,
            {
                headers: {
                    Authorization: `Bearer ${apiToken}`,
                },
            },
        );
    } catch (error) {
        throw Error(error);
    }

    const data = await listRowsRes.json();

    // Process data into nodes.
    data.items.forEach(item => {
        const jsonString = JSON.stringify(item);

        const gatsbyNode = {
            // Fields from Coda
            data: item,

            // Required Gatsby fields
            id: `Coda ${item.id}`,
            parent: '__SOURCE__',
            children: [],
            internal: {
                type: `Coda${tableIdOrName}Table`,
                contentDigest: crypto
                    .createHash('md5')
                    .update(jsonString)
                    .digest('hex'),
            },
        };

        createNode(gatsbyNode);
    });
};
