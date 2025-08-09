import CrudRepository from "./crudrepository"

class airportrepository extends CrudRepository{
    constructor(){
        super('airport')
    }
    
}
export default airportrepository
