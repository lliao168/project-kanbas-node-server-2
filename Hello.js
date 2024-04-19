export default function Hello(app) {
    // function sayHello(req, res) {
    //     res.send('Hello World');   //res is response
    // }

    // function lifeIsGood(req, res) {
    //     res.send('Life is Good!');   //res is response
    // }

    // function rootResponse(req, res) {
    //     res.send("Welcome to Node.js HTTP Restful Server")
    // }

    // app.get('/hello', sayHello);  
    // app.get("/hello", rootResponse); 
    // app.get("/good", lifeIsGood);

    app.get('/hello', (req, res) => {
        res.send('Life is good!')
      })
    app.get('/', (req, res) => {
        res.send('Welcome to Full Stack Development!')
      })
    
}