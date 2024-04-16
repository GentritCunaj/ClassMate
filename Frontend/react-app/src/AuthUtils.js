
import { jwtDecode } from 'jwt-decode';

const decodeToken = (token) => {
   
      try {
        const decodedToken = jwtDecode(token);
        let user = [];
        console.log(decodedToken);
        const userRole = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
        const id = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'];
        user.role = userRole;
        user.id = id;
        return user;
      } catch (error) {
        console.error('Error decoding token:', error);
      }
   
};

export {decodeToken};
