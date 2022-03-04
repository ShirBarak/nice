import express, { Request, Response } from 'express';

const app = express();
const LIMIT = 2;

const tests = [
    { id: 1, name: '1' },
    { id: 2, name: '2' },
    { id: 3, name: '3' },
    { id: 4, name: '4' },
    { id: 5, name: '5' },
    { id: 6, name: '6' },
    { id: 7, name: '7' }
]

    
    const paginateResults = (model: any) => {
        return (req: any, res: any, next: any) => {
            const page = Number(req.query.page) || 0;
            
            const startIndex = page * LIMIT;
            const endIndex = (page + 1) * LIMIT;
            
            const results: any = { next: -1, prev: -1 };
            
            results.data = tests.slice(startIndex, endIndex);
            
            if (endIndex < tests.length) {
                results.next = page + 1;
            }
            if (startIndex > 0) {
                results.prev = page - 1;
            }
        res.paginatedResult = results;
        next();
        }
    }

app.get('/tests', paginateResults(tests), (request: Request, response: any) => {
    response.json(response.paginatedResult)
});
app.listen(3000);