// import Container from 'react-bootstrap/Container';
// import Nav from 'react-bootstrap/Nav';
// import Navbar from 'react-bootstrap/Navbar';
// import Button from 'react-bootstrap/Button'; // Corrigido import
// import AuthRequests from '../../fetch/AuthRequests';
// import { useState, useEffect } from 'react';

// function Navegacao() {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [nomeUsuario, setNomeUsuario] = useState('');

//   useEffect(() => {
//     const isAuth = localStorage.getItem('isAuth');
//     const token = localStorage.getItem('token');

//     if (isAuth === 'true' && token && AuthRequests.checkTokenExpiry()) {
//       setIsAuthenticated(true);
//       const username = localStorage.getItem('username');
//       setNomeUsuario(username || '');
//     } else {
//       setIsAuthenticated(false);
//     }
//   }, []);

//   const estiloNavbar = {
//     backgroundColor: 'var(--primaryColor)',
//   };

//   const estiloNavOptions = {
//     color: 'var(--fontColor)',
//     marginRight: '15px',
//   };

//   const logout = () => {
//     AuthRequests.removeToken();
//     localStorage.removeItem('isAuth');
//     localStorage.removeItem('username');
//     window.location.href = '/login'; // Redireciona para a tela de login
//   };

//   return (
//     <Navbar expand="lg" style={estiloNavbar} variant="dark">
//       <Container>
//         <Navbar.Brand href="/" style={estiloNavOptions}>
//           Minha Plataforma
//         </Navbar.Brand>
//         <Nav className="ml-auto">
//           {isAuthenticated ? (
//             <>
//               <Nav.Item style={estiloNavOptions}>
//                 Bem-vindo, {nomeUsuario}
//               </Nav.Item>
//               <Button variant="outline-light" onClick={logout}>
//                 Sair
//               </Button>
//             </>
//           ) : (
//             <>
//               <Nav.Link href="/login" style={estiloNavOptions}>
//                 Login
//               </Nav.Link>
//               <Nav.Link href="/cadastro" style={estiloNavOptions}>
//                 Cadastro
//               </Nav.Link>
//             </>
//           )}
//         </Nav>
//       </Container>
//     </Navbar>
//   );
// }

// export default Navegacao;
