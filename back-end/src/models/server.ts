import express, {Application} from 'express'; //importamos la dependncia express para ver los datos
import cors from 'cors'
//importamos las rutas
import routesUsuarios from '../routes/routesusuarios'; 
import routesUser from '../routes/user';

//rmportamos los modelos
import { modelusuarios } from './modelsusuarios';
import { User } from './modeluser';

class Server {

        private app:    Application//variable privada
        private port: string;
        constructor(){//instancia de la clase
            this.app = express();
            this.port = process.env.PORT ||'3001';
            this.listen();
            this.midlewares();
            this.routes();
            this.dbConnect();

    }
    listen(){ // metodo
        this.app.listen(this.port,() => {
            console.log('aplicacion corriendo en el puerto'+this.port);
    })
}
    routes() {// configuraciones de ruta
        this.app.use('/api/usuarios',routesUsuarios);
        this.app.use('/api/users',routesUser);
    }
    midlewares(){// optener json para incryptar la contraseña
        this.app.use(express.json());
        //cors esto es para enlazar los puertos diferentes
        this.app.use(cors());
    }
    async dbConnect(){
        try{
            await modelusuarios.sync();
            await User.sync();
        }catch(error){
            console.error("database not connected",error);
        }
    }
}
export default Server;