/**
 * This modifies the React Docgen types because we use `doctrine` to parse the description field.
 */
export type ComponentDefinition = DocgenComponentDefinition & {
    props: Record<
        string,
        DocgenComponentProps & {
            description: {
                description: string;
                tags: Array<{ title: string; description: string }>;
            };
        }
    >;
};
