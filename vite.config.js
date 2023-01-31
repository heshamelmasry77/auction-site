import {resolve} from "path";

const path = require('path')

export default {
    root: path.resolve(__dirname, 'src'),
    build: {
        rollupOptions: {
            input: {
                home: resolve(__dirname, 'src/index.html'),
                createListing: resolve(__dirname, 'src/create-listing.html'),
                listingDetails: resolve(__dirname, 'src/listing-details.html'),
            },
        },
        outDir: '../dist',
    },
}
