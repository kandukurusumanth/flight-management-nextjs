const bcrypt = require('bcrypt');
export function hashPassword(myPlaintextPassword){
    const saltRounds=10
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(myPlaintextPassword, salt);
    return hash
}
export function checkPassword(myPlaintextPassword,hashpassword){
    return bcrypt.compareSync(myPlaintextPassword, hashpassword);
}