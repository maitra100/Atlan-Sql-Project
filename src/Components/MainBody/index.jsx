import React,{useEffect, useState} from "react";
import './mainbody.css'
import jsonObj from '../../public/jobs.json'

const queries=['Query 1','Query 2','Query 3','Query 4','Query 5'];
const positions=['SE-I','SE-II','MLE-I','MLE-II','PDE-I'];
const opens=['Asc','Desc'];
const companies=['Google','Flipkart','Atlan','LinkedIn'];
const countries=['India','Germany','Russia'];
const groupings=['Position','Country','Company','Openings'];
const aggregates=['sum','avg','distinct','count'];

function MainBody(){
    const [jobs,setJobs]=useState(undefined);
    const [queryInput,setQueryInput]=useState('');
    const [dropDownQuery,setDropDownQuery]=useState('');
    const [openBox,setOpenBox]=useState(false);
    const [openBox2,setOpenBox2]=useState(false);
    const [openBox3,setOpenBox3]=useState(false);
    const [openBox4,setOpenBox4]=useState(false);
    const [openBox5,setOpenBox5]=useState(false);
    const [openBox6,setOpenBox6]=useState(false);
    const [openBox7,setOpenBox7]=useState(false);
    const [position,setPosition]=useState('');
    const [openings,setOpenings]=useState('');
    const [company,setCompany]=useState('');
    const [country,setCountry]=useState('');
    const [role,setRole]=useState(positions);
    const [firm,setFirm]=useState(companies);
    const [nation,setNation]=useState(countries);
    const [groups,setGroups]=useState(groupings);
    const [aggs,setAggs]=useState(aggregates);
    const [grouping,setGrouping]=useState('');
    const [agg,setAgg]=useState('');
    const [request,setRequest]=useState('Select * from Table');
    const [pageIndex,setPageIndex]=useState([1,6]);
    const [currPage,setCurrPage]=useState(1);
    const [endPage,setEndPage]=useState(undefined);
    const [totalCount,setTotalCount]=useState(undefined);
    let modulus=3;

    const changePosition=(e)=>{
        setPosition(e.target.value);
        if(e.target.value===''){
            setOpenBox2(false);
            setRole(positions);
            return ;
        }
        let str=e.target.value;
        console.log(role,'role');
        console.log(str);
        let arr=positions.filter((res)=>{
            let s=res.toLowerCase();
            return s.includes(str);
        })
        console.log(arr,'arr');
        setRole(arr);
        setOpenBox2(true);
    }

    const changeCountry=(e)=>{
        setCountry(e.target.value);
        if(e.target.value===''){
            setOpenBox5(false);
            setNation(countries);
            return ;
        }
        let str=e.target.value;
        let arr=countries.filter((res)=>{
            let s=res.toLowerCase();
            return s.includes(str);
        })
        setNation(arr);
        setOpenBox5(true);
    }

    const changeFirm=(e)=>{
        setCompany(e.target.value);
        if(e.target.value===''){
            setOpenBox4(false);
            setFirm(companies);
            return ;
        }
        let str=e.target.value;
        let arr=companies.filter((res)=>{
            let s=res.toLowerCase();
            return s.includes(str);
        })
        setFirm(arr);
        setOpenBox4(true);
    }

    const changeAgg=(e)=>{
        setAgg(e.target.value);
        if(e.target.value===''){
            setOpenBox7(false);
            setAggs(aggregates);
            return ;
        }
        let str=e.target.value;
        let arr=aggregates.filter((res)=>{
            let s=res.toLowerCase();
            return s.includes(str);
        })
        setAggs(arr);
        setOpenBox7(true);
    }

    const changeGroup=(e)=>{
        setGrouping(e.target.value);
        if(e.target.value===''){
            setOpenBox6(false);
            setGroups(groupings);
            return ;
        }
        let str=e.target.value;
        let arr=groupings.filter((res)=>{
            let s=res.toLowerCase();
            return s.includes(str);
        })
        setGroups(arr);
        setOpenBox6(true);
    }

    const searchQuery=()=>{
        let len=queryInput.length;
        if(len===0){
            setCurrPage(1);
            setEndPage(Math.ceil(jsonObj.jobs.length/6));
            setPageIndex([1,6]);
            setJobs(jsonObj.jobs);
            setDropDownQuery('');
            setCompany('');
            setPosition('');
            setCountry('');
            setOpenings('');
            setGrouping('');
            setAgg('');
            setRequest('Select * from Table');
            return ;
        }
        let num=len%modulus;
        let arr=jsonObj.jobs.filter((job,index)=>{
            return num===(index)%modulus;
        })
        setEndPage(Math.ceil(arr.length/6));
        setCurrPage(1);
        setPageIndex([1,6]);
        setJobs(arr);
        setDropDownQuery('');
        setCompany('');
        setPosition('');
        setCountry('');
        setOpenings('');
        setGrouping('');
        setAgg('');
        setRequest(queryInput);
        setPageIndex([1,6]);
        setCurrPage(1);
    }

    const searchQuery2=()=>{
        if(dropDownQuery.length===0){
            setCurrPage(1);
            setEndPage(Math.ceil(jsonObj.jobs.length/6))
            setPageIndex([1,6]);
            setJobs(jsonObj.jobs)
            setQueryInput('');
        setCompany('');
        setPosition('');
        setCountry('');
        setOpenings('');
        setGrouping('');
            setAgg('');
        setRequest('Select * from Table');
            return ;
        }
        let str=dropDownQuery.charAt(dropDownQuery.length-1);
        let len=parseInt(str);
        let num=len%modulus;
        let arr=jsonObj.jobs.filter((job,index)=>{
            return num===(index)%modulus;
        })
        setEndPage(Math.ceil(arr.length/6))
        setCurrPage(1);
        setPageIndex([1,6]);
        setJobs(arr);
        setQueryInput('');
        setCompany('');
        setPosition('');
        setCountry('');
        setOpenings('');
        setGrouping('');
            setAgg('');
        setRequest(dropDownQuery);
    }

    const searchQuery3=()=>{
        let len=position.length+openings.length+company.length+country.length+grouping.length+agg.length;
        if(len===0){
            setJobs(jsonObj.jobs);
            setCurrPage(1);
            setPageIndex([1,6]);
            setEndPage(Math.ceil(jsonObj.jobs.length/6))
            setQueryInput('');
        setDropDownQuery('');
        setRequest('Select * from Table');
            return ;
        }
        let str='Select  ';
        if(agg.length>0){
            str=str.concat(`${agg}(${grouping})`);
        }
        else{
            str=str.concat(`* from Table`);
        }
        if(position.length>0){
            str=str.concat(` where position=${position}`);
        }
        if(company.length>0){
            if(str.includes(' where')){
                str=str.concat(` and company=${company}`);
            }
            else{
                str=str.concat(` where company=${company}`);
            }
        }
        if(country.length>0){
            if(str.includes(' where')){
                str=str.concat(` and country=${country}`);
            }
            else{
                str=str.concat(` where country=${country}`);
            }
        }
        if(grouping.length>0){
            str=str.concat(` group by ${grouping}`);
        }
        if(openings.length>0){
            str=str.concat(` order by ${openings}`)
        }
        let num=len%modulus;
        let arr=jsonObj.jobs.filter((job,index)=>{
            return num===(index)%modulus;
        })
        console.log(arr,'arr');
        setEndPage(Math.ceil(arr.length/6));
        setPageIndex([1,6]);
        setCurrPage(1);
        setJobs(arr);
        setDropDownQuery('');
        setRequest(str);
    }

    useEffect(()=>{
        setJobs(jsonObj.jobs);
        setEndPage(Math.ceil(jsonObj.jobs.length/6));
        setTotalCount(Math.ceil(jsonObj.jobs.length/6));
    },[])

    const nextPage=()=>{
        setCurrPage(currPage+1);
        setPageIndex([pageIndex[0]+6,pageIndex[1]+6]);
    }

    const prevPage=()=>{
        setCurrPage(currPage-1);
        setPageIndex([pageIndex[0]-6,pageIndex[1]-6]);
    }

    const jumpFirstPage=()=>{
        setCurrPage(1);
        setPageIndex([1,6]);
    }

    return (
        <div id="mainbody">
            <div id="left">
            <div id="up">
                <label>Search your query here</label>
                <textarea id="modalinput" onChange={(e)=>setQueryInput(e.target.value)} value={queryInput} placeholder="Input" />
                <button className="button" style={{'cursor':'pointer'}} onClick={searchQuery}>Search</button>
            </div>
            <hr style={{
          height: '1px',
          width:'90%'
        }}/>
            <div id="middle">
            <div id="find">
                <label>Search pre-written query</label>
                <input className="input" type="text" placeholder="Search" onClick={()=>{setOpenBox(!openBox);
                if(openBox===false){
                    setDropDownQuery('')
                }}}  value={dropDownQuery}/>
                </div>
                <div id="open">
                {openBox && queries.map((query)=>{
                    console.log(query);
                    return (<div id="inside" style={{'cursor':'pointer'}} onClick={()=>{setDropDownQuery(query);
                    setOpenBox(false)}}>{query}</div>)})}
                </div>
                <button className="button" style={{'cursor':'pointer'}} onClick={searchQuery2}>Search</button>
            </div>
            <hr style={{
          height: '1px',
          width:'90%'
        }}/>
        <div id="down">
        <div id="position">
            <div id="parameter">
                <label>Position</label>
                <input className="input" type="text" placeholder="search" onChange={changePosition} onClick={()=>{
                    setOpenBox2(!openBox2);
                }}  value={position}/>
            </div>
            <div id="options">
                {openBox2 && role.map((res)=>{
                    return (<div id="inside" style={{'cursor':'pointer'}} onClick={()=>{setPosition(res);
                        setOpenBox2(false)}}>{res}</div>)
                })}
            </div>
        </div>
        <div id="position">
            <div id="parameter">
                <label>Openings Order</label>
                <input className="input" type="text" placeholder="search" onClick={()=>{
                    setOpenBox3(!openBox3);
                    if(openBox3===false){
                        setOpenings('');
                    }
                }} value={openings}/>
            </div>
            <div id="options">
                {openBox3 && opens.map((res)=>{
                    return (<div id="inside" style={{'cursor':'pointer'}} onClick={()=>{setOpenings(res);
                        setOpenBox3(false)}}>{res}</div>)
                })}
            </div>
        </div>
        <div id="position">
            <div id="parameter">
                <label>Company</label>
                <input className="input" type="text" placeholder="search" onChange={changeFirm} onClick={()=>{
                    setOpenBox4(!openBox4);
                }} value={company}/>
            </div>
            <div id="options">
                {openBox4 && firm.map((res)=>{
                    return (<div id="inside" style={{'cursor':'pointer'}} onClick={()=>{setCompany(res);
                        setOpenBox4(false)}}>{res}</div>)
                })}
            </div>
        </div>
        <div id="position">
            <div id="parameter">
                <label>Country</label>
                <input className="input" type="text" placeholder="search" onChange={changeCountry} onClick={()=>{
                    setOpenBox5(!openBox5);
                }} value={country}/>
            </div>
            <div id="options">
                {openBox5 && nation.map((res)=>{
                    return (<div id="inside" style={{'cursor':'pointer'}} onClick={()=>{setCountry(res);
                        setOpenBox5(false)}}>{res}</div>)
                })}
            </div>
        </div>
        <div id="position">
            <div id="parameter">
                <label>Grouping</label>
                <input className="input" type="text" placeholder="search" onChange={changeGroup} onClick={()=>{
                    setOpenBox6(!openBox6);
                }} value={grouping}/>
            </div>
            <div id="options">
                {openBox6 && groups.map((res)=>{
                    return (<div id="inside" style={{'cursor':'pointer'}} onClick={()=>{setGrouping(res);
                        setOpenBox6(false)}}>{res}</div>)
                })}
            </div>
        </div>
        <div id="position">
            <div id="parameter">
                <label>Aggregate</label>
                <input className="input" type="text" placeholder="search" onChange={changeAgg} onClick={()=>{
                    setOpenBox7(!openBox7);
                }} value={agg}/>
            </div>
            <div id="options">
                {openBox7 && aggs.map((res)=>{
                    return (<div id="inside" style={{'cursor':'pointer'}} onClick={()=>{setAgg(res);
                        setOpenBox7(false)}}>{res}</div>)
                })}
            </div>
        </div>
        </div>
        <div style={{display:'flex',justifyContent:'center',marginBottom:'5%'}}>
        <button className="button" style={{'cursor':'pointer'}} onClick={searchQuery3}>Search</button>
        </div>
        </div>
        <div id="right">
            <div style={{display:'flex',justifyContent:'center'}}>
                <p>{request}</p>
            </div>
            <div id="attributes">
                <p>Position</p>
                <p style={{}}>Openings</p>
                <p style={{}}>Company</p>
                <p style={{}}>Country</p>
            </div>
            <hr style={{
          height: '1px',
          width:'100%'
        }}/>
        <div id="table">
            {jobs && jobs.map((job,index)=>{
                if(index+1<pageIndex[0] || index+1>pageIndex[1]){
                    return ;
                }
                return (
            <div id="tuple">
                <p style={{width:'25%',textAlign:"start"}}>{job.position}</p>
                <p style={{width:'10%'}}>{job.openings}</p>
                <p style={{width:'25%',textAlign:"center"}}>{job.company}</p>
                <p style={{width:'12%',textAlign:"end"}}>{job.country}</p>
            </div>
                )
            })}
        </div>
        <div id="menubar">
            <div style={{display:'flex',alignContent:'center'}}>{pageIndex[0]!==1 && (
                <p onClick={jumpFirstPage} style={{marginTop:'0%','cursor':'pointer'}}>Jump to 1st page</p>
            )}</div>
            <div>
                {`Page ${currPage} of ${endPage}`}
            </div>
            <div style={{display:'flex',alignContent:'center',width:'12%','cursor':'pointer',justifyContent:'space-around'}}>
                {currPage!==1 && <div onClick={prevPage}>{`Prev |`}</div>}
                {currPage!==endPage && (<div onClick={nextPage} style={{marginLeft:'0.5%','cursor':'pointer'}}>
                    {` Next`}
                    </div>)}
            </div>
        </div>
        </div>
        </div>
    )
}

export default MainBody