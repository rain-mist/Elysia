import { EthProvider } from "./contexts/EthContext";
import Intro from "./components/Intro/";
import Setup from "./components/Setup";
import Demo from "./components/Demo";
import Footer from "./components/Footer";
import './css/pure-min.css';
import {Route, NavLink, HashRouter} from "react-router-dom";

function App() {
  return (
    <EthProvider>
      <div id="App">
        <div className="container">
          <Intro />
          <hr />
          <Setup />
          <hr />
          <Demo />
          <hr />
          <Footer />
        </div>
      </div>
    </EthProvider>
//     <HashRouter>
//     <div>
//     <h1>基于区块链的身份认证系统</h1>
//     <div className="App">          
//         <nav className="navbar pure-menu pure-menu-horizontal">
//           <ul className="pure-menu-list navbar-right">
//             <span>
//             <li className="pure-menu-item">注册</li>
//             <li className="pure-menu-item">登录</li>
//             {/* <li className="pure-menu-item"></li> */}
//             {/* <li className="pure-menu-item"><NavLink to = "/Home" className="pure-menu-link">注册登录</NavLink></li>
//             <li className="pure-menu-item">信息修改</li>
//             <li className="pure-menu-item">区块查询</li> */}
//             {/* <NavLink to = "/QueryBlock" className="pure-menu-link"> */}
//             </span>
//           </ul>
//         </nav>
//         <br/>
//         <br/>
//         <br/>
//     </div>
//     <div>
//         <Route exact path = "/Home" component = {Log}/>
//         <Route path = "/Profile" component = {Profile}/>
//         <Route path = "/QueryBlock" component = {QueryBlock}/>
//         <Route path = "/Purse" component = {Purse}/>
//       </div>
// </div>
// </HashRouter>
  );
}

export default App;
