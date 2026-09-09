import { useState, useEffect } from 'react'
import Ques from './ques.jsx'
import "../styles/quiz.css"
import ResultModal from './ResultModal.jsx'
import Loading from './Loading.jsx'
import decodeUriComponent from 'decode-uri-component';
import { useNavigate, useParams, Link } from 'react-router-dom';

function Quiz() {
    var d = new Date();
    const currentYear = d.getFullYear();


    const [showModal, setShowModal] = useState(false);
    const openModal = () => {
        setShowModal(true);
    };
    const closeModal = () => {
        setShowModal(false);
    };


    const navigation = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const { category } = useParams();
    
    if(lookCatNo(category) === -1)
    {
        navigation("/404")
    }

    //size of one questions page
    const size = 10;
    //list of all the questions fetched in one request turn
    const [allQtn, setAllQtn] = useState([]);
    //Keeps marks of all questions (index 0), and total at index 10
    const [marks, setMarks] = useState(Array(size + 1).fill(0));
    //to rerender when play again is clicked
    const [helpRender, setHelpRender] = useState(0);
    //using token we can fetch questions in bathces depending upon amound set in API request
    const urlToken = "https://opentdb.com/api_token.php?command=request"
    //number of question in catgory
    // const urlQnAmount = "https://opentdb.com/api_count.php?category=" + lookCatNo(category)
    // const [tokenLimit, setTokenLimit] = useState(0);
    // useEffect(() => {
    //     fetch(urlQnAmount).then(res => res.json())
    //         .then(data => setTokenLimit(Math.floor(data["category_question_count"]["total_question_count"]/size)))
    // }, [])
    //limit for number of batches that can be requested as total question is 74 in the API 
    //token
    const [token, setToken] = useState("");
    //keeps count of number of times we have already fetched new batches
    // const [newTokenSteps, setNewTokenSteps] = useState(0);
    //to refetch new API token after all batch requests have been exhausted
    const [currIndex, setCurrIndex] = useState(0);


    //Fetch Token
    function resetToken()
    {
        fetch(urlToken).then(res => res.json())
            .then(data => setToken(data["token"]))
    }


    //API request to fetch Questions
    const urlQuestion = "https://opentdb.com/api.php?amount=" + size + "&token=" + token + "&category=" + lookCatNo(category) + "&type=multiple&encode=url3986";
    useEffect(() => {
        setIsLoading(true);
        // setNewTokenSteps((ele) => {
        //     return ele + 1;
        // });
        // if (newTokenSteps === tokenLimit + 1) {
        //     // setNewTokenSteps(0);
        //     setCurrIndex(ele => {
        //         return ele + 1;
        //     });
        // }

        fetch(urlQuestion)
            .then(res => res.json())
            .then(res => {
                if (res["response_code"] == 4) {
                    console.log("Token Empty - resetting token");
                    resetToken();
                }
                return res;
            })
            .then(data => setAllQtn((Array.from(Object.values(data)))[1]))
        .then(ptt => setAllQtn((ele) => {
            const newEle = ele.map((que) => {
                var options = [que.correct_answer];
                options = options.concat(que.incorrect_answers);
                options = options.sort(() => Math.random() - 0.5);
                return { ...que, 'option': options }
            })
            setIsLoading(false);
            return newEle;
        }));
}, [helpRender,category]);


function decode(text) {
    return decodeUriComponent(text)
}

function lookCatNo(category) {
    const catMap = {
      'computer-science': 18,
      'mathematics': 19,
      'sports': 21,
      "history": 23,
      "animals": 27,
    }
  
    // Check if the category exists in the map
    if (catMap.hasOwnProperty(category)) {
      return catMap[category];
    } else {
      // Return -1 for categories not found in the map
      return -1;
    }
  }

function siteForward() {
    navigation("/mathematics");
}
if (allQtn !== undefined) {

    //updates marks when a options is selected
    function updateMarks(event, select_c) {
        console.log(select_c)
        let k = event.target.getAttribute("name");
        k = parseInt(k);
        if (allQtn[k] !== undefined) {
            if (Number.isNaN(select_c)) {
                if (marks[k] === 1) {
                    marks[size]--;
                }
                marks[k] = 0;
                //     console.log(marks);
            }
            else {
                if (marks[k] === 1) {
                    marks[size]--;
                }
                marks[k] = (event.target.getAttribute("value") === decode(allQtn[k].correct_answer)) ? 1 : 0;
                marks[size] = marks[size] + marks[k];
                // console.log(marks);
            }
        }
    }

    //reloads and resets element when play again is clicked
    function reload() {
        // showPopup();
        // navigation("/quiz/" + category);
        setShowModal(false);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setHelpRender(ele => {
            return ele + 1;
        });
        setMarks(Array(size + 1).fill(0));
    }

    let id = 0;

    //returns jsx of questions
    const quest = allQtn.map((que) => {
        return (<Ques
            key={"question - " + id++}
            id={id}
            question={que.question}
            incorrect_answers={que.incorrect_answers}
            correct_answer={que.correct_answer}
            option={que.option}
            updateMarks={updateMarks}
            initmarks={["op0", "op1", "op2", "op3"]}
        />)
    });


    return (
        <section className="quizPage" id="quizPage" >
            <div className="header">Quizton</div>
            <div className="quizcat">
                <Link to="/computer-science" className = {category == "computer-science" ? "select-catElement" : "catElement"}>Computer</Link>
                <Link to="/mathematics" className = {category == "mathematics" ? "select-catElement" : "catElement"}>Maths</Link>
                <Link to="/sports" className = {category == "sports" ? "select-catElement" : "catElement"}>Sports</Link>
                <Link to="/history" className = {category == "history" ? "select-catElement" : "catElement"}>History</Link>
                <Link to="/animals" className = {category == "animals" ? "select-catElement" : "catElement"}>Animals</Link>
            </div>
            <div className="quiz-p1" id="quiz-sheet">
                {quest}
            </div>
            <Loading
                isloading={isLoading}
                setIsLoading={setIsLoading} />
            <ResultModal
                marks={marks[size]}
                show={showModal}
                reload={reload}
                onClose={closeModal} />
            {/* <button className="check-answer" onClick={showPopup}>Show Score</button> */}
            <button className="check-answer" onClick={openModal}>Show Score</button>
            <div className="rights">Made By <a href="https://mdshabbirjamal.one">Md Shabbir Jamal</a> &copy; {currentYear} All Rights Reserved</div>
        </section>
    )
}
}

export default Quiz;