
/**
 * /src/js/requests/TypesenseCollection.js
 * 
 */
window.annexSearch.DependencyLoader.push(['window.annexSearch.BaseRequest'], function() {

    /**
     * window.annexSearch.TypesenseCollectionRequest
     * 
     * @extends window.annexSearch.BaseRequest
     */
    window.annexSearch.TypesenseCollectionRequest = window.annexSearch.TypesenseCollectionRequest || class TypesenseCollectionRequest extends window.annexSearch.BaseRequest {

        /**
         * constructor
         * 
         * @access  public
         * @param   String collectionName
         * @return  void
         */
        // constructor(collectionName) {
        //     super();
        // }

        /**
         * fetch
         * 
         * @access  public
         * @return  Boolean
         */
//         fetch() {


// // https://claude.ai/chat/5e0424e3-171d-4fe9-8403-c5072490b3a7
// // https://typesense.org/docs/29.0/api/collections.html#list-all-collections


//             // Typesense configuration
//             const TYPESENSE_CONFIG = {
//               host: 'your-typesense-host.com', // Replace with your Typesense host
//               port: 443, // Use 443 for HTTPS, 8108 for HTTP
//               protocol: 'https', // 'https' or 'http'
//               apiKey: 'your-api-key' // Replace with your API key
//             };

//             // Base URL for Typesense API
//             const BASE_URL = `${TYPESENSE_CONFIG.protocol}://${TYPESENSE_CONFIG.host}:${TYPESENSE_CONFIG.port}`;

//             /**
//              * Fetch details of a specific collection
//              * @param {string} collectionName - Name of the collection to fetch
//              * @returns {Promise<Object>} Collection details
//              */
//             async function fetchCollectionDetails(collectionName) {
//               try {
//                 const url = `${BASE_URL}/collections/${collectionName}`;
                
//                 const response = await fetch(url, {
//                   method: 'GET',
//                   headers: {
//                     'X-TYPESENSE-API-KEY': TYPESENSE_CONFIG.apiKey,
//                     'Content-Type': 'application/json'
//                   }
//                 });

//                 if (!response.ok) {
//                   throw new Error(`HTTP error! status: ${response.status} - ${response.statusText}`);
//                 }

//                 const collectionData = await response.json();
//                 return collectionData;

//               } catch (error) {
//                 console.error('Error fetching collection details:', error);
//                 throw error;
//               }
//             }

//             // This file focuses on fetching a SPECIFIC collection only

//             // Usage example - fetching a specific collection
//             async function example() {
//               try {
//                 // Fetch details of a specific collection by name
//                 const collectionDetails = await fetchCollectionDetails('products');
//                 console.log('Collection Details:', collectionDetails);
                
//                 // The response will include:
//                 // - name: collection name
//                 // - fields: array of field definitions
//                 // - default_sorting_field: default field for sorting
//                 // - num_documents: number of documents in collection
//                 // - created_at: timestamp when collection was created
                
//                 // Display the schema in a readable format
//                 displayCollectionSchema(collectionDetails);

//               } catch (error) {
//                 console.error('Failed to fetch collection:', error);
//               }
//             }

//             // Alternative implementation using XMLHttpRequest (for older browser support)
//             function fetchCollectionDetailsXHR(collectionName) {
//               return new Promise((resolve, reject) => {
//                 const xhr = new XMLHttpRequest();
//                 const url = `${BASE_URL}/collections/${collectionName}`;
                
//                 xhr.open('GET', url, true);
//                 xhr.setRequestHeader('X-TYPESENSE-API-KEY', TYPESENSE_CONFIG.apiKey);
//                 xhr.setRequestHeader('Content-Type', 'application/json');
                
//                 xhr.onreadystatechange = function() {
//                   if (xhr.readyState === 4) {
//                     if (xhr.status >= 200 && xhr.status < 300) {
//                       try {
//                         const data = JSON.parse(xhr.responseText);
//                         resolve(data);
//                       } catch (parseError) {
//                         reject(new Error('Failed to parse response JSON'));
//                       }
//                     } else {
//                       reject(new Error(`HTTP error! status: ${xhr.status}`));
//                     }
//                   }
//                 };
                
//                 xhr.onerror = function() {
//                   reject(new Error('Network error occurred'));
//                 };
                
//                 xhr.send();
//               });
//             }

//             // Utility function to display collection schema in a readable format
//             function displayCollectionSchema(collection) {
//               console.log(`\n=== Collection: ${collection.name} ===`);
//               console.log(`Documents: ${collection.num_documents}`);
//               console.log(`Created: ${new Date(collection.created_at * 1000).toLocaleDateString()}`);
              
//               if (collection.default_sorting_field) {
//                 console.log(`Default Sort: ${collection.default_sorting_field}`);
//               }
              
//               console.log('\nFields:');
//               collection.fields.forEach(field => {
//                 const optional = field.optional ? ' (optional)' : ' (required)';
//                 const facet = field.facet ? ' [facetable]' : '';
//                 const index = field.index !== false ? ' [indexed]' : ' [not indexed]';
//                 console.log(`  - ${field.name}: ${field.type}${optional}${facet}${index}`);
//               });
//             }

//             // Run example (uncomment to test)
//             // example();
//             return true;
//         }
    }
});
