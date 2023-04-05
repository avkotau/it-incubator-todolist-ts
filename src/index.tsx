import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';


const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
// //
// // // If you want to start measuring performance in your app, pass a function
// // // to log results (for example: reportWebVitals(console.log))
// // // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//
//
// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';
//
//
// export const Wrapper  = () => {
//     return <category city="minsk" />
// }
// type PropsType = {
//     city: string
// }
// export const category: React.FC<PropsType> = (props) => {
//     return <div>hello</div>
// }
//
// /*
// В коде в разных местах допущена одна и та же ошибка.
// Какое слово должно быть написано вместо ошибочного?
// */
// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//
//
//
// type UserPropsType = {
//     name: string
//     description: string
// }
// export const User: React.FC<UserPropsType> = (props) => {
//     return <div>
//         <h1>Имя: {props.name}</h1>
//         //<div>Описание: {ххх}</div>
//     </div>
// }
//
// //Что нужно написать вместо ххх, что бы код работал?
//
//
// type PropsType = {
//     city: string        // 'minsk'
//     country: string     // 'belarus'
//     coords?: string     // '53.917501,27.604851'
// }
//
// export const Wrapper1 = () => {
//     return <PropsComponent1 city='minsk'/>
// }
//
// export const PropsComponent1: React.FC<PropsType> = (props) => {
//     return <div>hello</div>
// }
//
// // Что МИНИМАЛЬНО ДОСТАТОЧНО нужно дописать в строке 8 (cтрока с ошибкой), чтобы не было ошибки
//
//
//
// Что нужно написать вместо xxx и yyy? Ответ дайте через пробел, например:
// blabla onClick(props)
//
// copy
// type PagePropsType = {
//     age: number
//     name: string
//     avatarUrl: string
// }
// const Page: React.FC<PagePropsType> = (props) => {
//     return <User a={xxx} n={yyy} />
// }
// type UserPropsType = {
//     a: number
//     n: string
// }
// export const User: React.FC<UserPropsType> = (props) => {
//     return <div>name: {props.n}, age: {props.a}</div>
// }
//
// // Что нужно написать вместо xxx и yyy?
// // Ответ дайте через пробел, например: blabla onClick(props)
//
//
// // props.name props.age неправильно


// Что нужно написать вместо XXX и YYY? Ответ дайте через пробел, например:
// car user
//
// copy
// type NewsType = {
//     title: string
//     author: string
// }
// type ArticleType = {
//     title: string
//     date: string
//     text: string
// }
// type PagePropsType = {
//     news: NewsType[]
//     mainArticle: ArticleType
// }
// export const Page: React.FC<PagePropsType> = (props) => {
//     return <div>
//         <article>
//             <h1>Название: {props.NewsType.title}</h1>
//             <div>{props.XXX.date}</div>
//             <div>{props.XXX.text}</div>
//         </article>
//         <aside>Articles:
//             <ul>
//                 {props.YYY.map(n => <li>{n.title}, {n.author}</li>)}
//             </ul>
//         </aside>
//     </div>
// }
//
// mainArticle mainArticle mainArticle news неправильно

// wallets[0]wallets[1] правильно


// Что нужно написать вместо xxx yyy zzz, чтобы увидеть ожидаемый результат?
//
//     Ответ дайте через пробел, пример: a={12} ccc={video.id} d={'hello'}
//
// copy
// import ReactDOM from 'react-dom'
//
// export const VideoHeader = (props: {videoName: string}) => {
//     return <div>
//         😀 {props.videoName}
//     </div>
// }
// export const VideoContent = (props: {videoContent: string}) => {
//     return <div>
//         📼 <a href={props.videoContent}>{props.videoContent}</a>
//     </div>
// }
// export const VideoDescription = (props: {videoDescription: string}) => {
//     return <div>
//         📑 {props.videoDescription}
//     </div>
// }
//
// export const YoutubeVideo = (props: any) => {
//     return <div>
//         <VideoHeader xxx />
//         <VideoContent yyy />
//         <VideoDescription zzz />
//     </div>
// }
//
// export const App = () => {
//     const video = {
//         title: 'Samurai way',
//         link: 'https://www.youtube.com/watch?v=gb7gMluAeao&list=PLcvhF2Wqh7DNVy1OCUpG3i5lyxyBWhGZ8',
//         description: 'Best free react-course'
//     }
//
//     return <YoutubeVideo video={video} />
// }
//
// ReactDOM.render(<App />,
//     document.getElementById('root')
// );

//videoName={props.video.title} videoContent={props.video.link} videoDescription={props.video.description}


// Что нужно написать вместо XXX YYY ZZZ? Ответ дайте через пробел
//
// copy
// import ReactDOM from 'react-dom'
//
// const CrazyButton = (props: any) => {
//
//     const style = {
//         color: props.XXX,
//         backgroundColor: props.YYY
//     }
//
//     return <button style={style}>
//         {props.ZZZ}
//     </button>
// }
//
// export const App = () => {
//     return <div>
//         <CrazyButton title={'delete'} fontColor={'white'} bgColor={'red'}/>
//         <CrazyButton title={'add'} fontColor={'white'} bgColor={'green'}/>
//     </div>
// }
//
// ReactDOM.render(<App/>,
//     document.getElementById('root')
// )

//fontColor bgColor title правильно

//Что нужно написать вместо XXX YYY ZZZ? Ответ дайте через пробел
//
// copy
// import ReactDOM from 'react-dom'
//
// const Son = (props: any) => {
//     return <div>
//         I am son. My name is {props.name}
//     </div>
// }
//
//
// const Father = (props: any) => {
//     return <div>
//         I am father. My name is {props.name}
//         <Son name={props.sonName} />
//     </div>
// }
//
// const Granny = (props: any) => {
//     return <div>
//         I am granny. My name is {props.name}
//         <Father name={props.fatherName} sonName={props.sonName} />
//     </div>
// }
//
// export const App = () => {
//     return <div>
//         <Granny XXX={'Бабуля'} YYY={'Батя'} ZZZ={'Сын'}/>
//     </div>
// }
//
// ReactDOM.render(<App/>,
//     document.getElementById('root')
// )

//name fatherName sonName



// Вопрос
// Неверный ответ
// 4
// warning-circle
// 5
// warning-circle
// props.name props.age
//
// 6
// warning-circle
// mainArticle mainArticle mainArticle news

