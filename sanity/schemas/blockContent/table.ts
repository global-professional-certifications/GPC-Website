import { defineType } from 'sanity'

export default defineType({
    name: 'table',
    title: 'Table',
    type: 'object',
    fields: [
        {
            name: 'caption',
            title: 'Table Caption',
            type: 'string',
        },
        {
            name: 'importData',
            title: 'Import Excel / Google Sheets / CSV Data',
            type: 'text',
            description: 'Paste cells copied directly from Excel/Google Sheets, or paste comma-separated CSV rows here. This will automatically generate the table dynamically when rendering.',
        },
        {
            name: 'hasHeader',
            title: 'Use First Row as Header',
            type: 'boolean',
            initialValue: true,
            description: 'Treat the first row of your Excel/CSV data as the table header.',
        },
        {
            name: 'rows',
            title: 'Table Rows',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        {
                            name: 'cells',
                            title: 'Cells',
                            type: 'array',
                            of: [{ type: 'string' }],
                        },
                        {
                            name: 'isHeader',
                            title: 'Header Row',
                            type: 'boolean',
                            initialValue: false,
                        },
                    ],
                    preview: {
                        select: {
                            cells: 'cells',
                            isHeader: 'isHeader',
                        },
                        prepare({ cells, isHeader }) {
                            return {
                                title: cells?.join(' | ') || 'Empty row',
                                subtitle: isHeader ? 'Header Row' : 'Data Row',
                            }
                        },
                    },
                },
            ],
        },
    ],
    preview: {
        select: {
            caption: 'caption',
            rows: 'rows',
        },
        prepare({ caption, rows }) {
            return {
                title: caption || 'Table',
                subtitle: `${rows?.length || 0} rows`,
            }
        },
    },
})
