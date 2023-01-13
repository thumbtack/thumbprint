export interface ReactDocgenComponent {
    displayName: string;
    description: string;
    methods: unknown[];
    props: Record<
        string,
        {
            description: string;
            required: boolean;
            tsType: {
                name: string;
            };
        }
    >;
}
