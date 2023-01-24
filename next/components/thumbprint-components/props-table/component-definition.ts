export interface ComponentDefinition {
    displayName: string;
    description: string;
    methods: unknown[];
    props: Record<
        string,
        {
            description: {
                description: string;
                tags: Array<{ title: string; description: string }>;
            };
            required: boolean;
            tsType: {
                name: string;
                raw?: string;
                elements?: Array<{ name: string; value: string }>;
            };
            defaultValue?: {
                value: string;
                computed: boolean;
            };
        }
    >;
}
