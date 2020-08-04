const crypto = require('crypto');
const fetch = require('node-fetch');
const queryString = require('query-string');

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
            // https://coda.io/developers/apis/v1#operation/listRows
            `https://coda.io/apis/v1/docs/${docId}/tables/${tableIdOrName}/rows?${qs}`,
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
        const sanitizedItem = item;

        // Sanitize the column names that come from Coda. Spaces get replaced
        // with an underscore, allowing it to work better with Gatsby.
        Object.keys(sanitizedItem.values).forEach(key => {
            const newKey = key.replace(/\s+/g, '_');
            if (key !== newKey) {
                sanitizedItem.values[newKey] = sanitizedItem.values[key];
                delete sanitizedItem.values[key];
            }
        });

        const jsonString = JSON.stringify(sanitizedItem);

        const gatsbyNode = {
            // Fields from Coda
            data: sanitizedItem,

            // Required Gatsby fields
            id: `Coda ${sanitizedItem.id}`,
            parent: '__SOURCE__',
            children: [],
            internal: {
                type: `Coda${tableIdOrName}Table`,
                contentDigest: crypto.createHash('md5').update(jsonString).digest('hex'),
            },
        };

        createNode(gatsbyNode);
    });
};
