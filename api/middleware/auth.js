import jwt from 'jsonwebtoken';

const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];

        const customToken = token.length < 500;

        let decodedData;

        if(token && customToken){
            decodedData = jwt.verify(token, 'test');

            req.userId = decodedData?.id;
        }

        next()
    } catch (error) {
        console.error(error)
    }
}

export default auth;
