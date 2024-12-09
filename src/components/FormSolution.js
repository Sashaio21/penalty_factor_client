import { Card, Input, Select, MenuItem, Button } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import axios from '../axios';

export const FormSolution = ({sol , setDataSolutions,solRepare, setSolRepare,inputSolution ,setSolution, setInputSolution, setOpenModal}) => {
  
  const {
        register,
        handleSubmit,
        formState: { errors },
        setValue
    } = useForm();

    useEffect(()=>{
        setInputSolution({
          "expression": "x1**2+x2**2-20*x1-30*x2",
          "constraint_expr1": "2*x1+3*x2-50",
          "constraint_type1": "%3C=",
          "constraint_value1": 0,
          "constraint_expr2": "2*x1+x2-10",
          "constraint_type2": "%3C=",
          "constraint_value2": 0,
          "function_type":"min",
          "epsilon": 0,
          "x1_initial": 5,
          "x2_initial": 5
        })
      console.log("home")
    },[])


    // Функция для замены знака ** на ^
    function replacePlusWithPercent2B(obj) {
        const updatedObj = {};
        Object.entries(obj).forEach(([key, value]) => {
            if (typeof value === 'string') {
                updatedObj[key] = value.replace(/\+/g, '%2B').replace(/\^/g, '**');;
            } else {
                updatedObj[key] = value;
            }
        });
        return updatedObj;
    }

    //Функция для замены знаков
    function typesConstraint(){
        return [
        {"key" :"=", "value" : "="},
        {"key":"> ", "value":"%3E "},
        {"key":"< ", "value":"%3C "},
        {"key":">=", "value":"%3E="},
        {"key":"<=", "value":"%3C="},
        ]
    }

    function filterObjectsByTemplate(objects, template) {
      console.log("dfdsfdsf",template)
      return objects.filter(obj => 
          obj.expression == template.expression &&
          obj.constraint_expr1 == template.constraint_expr1 &&
          obj.constraint_type1 == template.constraint_type1 &&
          obj.constraint_value1 == template.constraint_value1 &&
          obj.constraint_expr2 == template.constraint_expr2 &&
          obj.constraint_type2 == template.constraint_type2 &&
          obj.constraint_value2 == template.constraint_value2
          );
      }


    const clickk = (data) =>{
      setInputSolution(data)
      console.log(data)
      data = replacePlusWithPercent2B(data)

      if (window.localStorage.getItem('token')) {
        axios.get('/solution/getall')
        .then((data)=>{
          
          setDataSolutions(filterObjectsByTemplate(data.data, inputSolution))

        })
      }

      
      data = `x1_min=-5&x1_max=5&x2_min=-5&x2_max=5&expression=${data.function_type.replace("max", "-").replace("min","")}(${data.expression})&constraint_expr1=${data.constraint_expr1}&constraint_type1=${data.constraint_type1}&constraint_value1=${data.constraint_value1}&constraint_expr2=${data.constraint_expr2}&constraint_type2=${data.constraint_type2}&constraint_value2=${data.constraint_value2}&function_type=${data.function_type}&epsilon=${data.epsilon}&x1_initial=${data.x1_initial}&x2_initial=${data.x2_initial}&method=${data.method}`
      axios.get(`http://localhost:5000/solution-data?${data}`)
        .then((res)=>{
          setSolution(res.data)
          console.log(res.data)
        })
    }

    return(
        <Card variant='elevation' style={{width:"30%", padding:"10px"}}>
        <form onSubmit={handleSubmit(clickk)}>
          <div>
            <Input
              placeholder='Функция' 
              name='expression'
              defaultValue={inputSolution.expression}
              {...register('expression')}
            />
            <Select id="fruits" name="function_type" defaultValue={inputSolution.function_type} {...register('function_type')} style={{width: "100px", height: "30px"}}>
              <MenuItem value="max">max</MenuItem>
              <MenuItem value="min">min</MenuItem>
            </Select>
          </div>
          <br/>
          <Input
            placeholder='Ограничение 1'
            name='constraint_expr1'
            defaultValue={inputSolution.constraint_expr1}
            {...register('constraint_expr1')}
          />
          <Select id="fruits" name="constraint_type1" defaultValue={inputSolution.constraint_type1} style={{width: "70px", height: "30px"}} {...register('constraint_type1')}>
            {
              typesConstraint().map((obj) => {return <MenuItem value={obj.value}>{obj.key}</MenuItem>})
            }
          </Select>
          <Input
            placeholder='значение'
            name='constraint_value1'
            style={{width: "50px", height: "30px"}}
            type='number'
            defaultValue={inputSolution.constraint_value1}
            {...register('constraint_value1')} 
          />
          <br/>
          <br/>
          <Input
            placeholder='Ограничение 2'
            name='constraint_expr2'
            defaultValue={inputSolution.constraint_expr2}
            {...register('constraint_expr2')}
          />
          <Select id="fruits" name="constraint_type2" defaultValue={inputSolution.constraint_type2} style={{width: "70px", height: "30px"}} {...register('constraint_type2')}>
            {
              typesConstraint().map((obj) => {return <MenuItem value={obj.value}>{obj.key}</MenuItem>})
            }
          </Select>
          <Input
            placeholder='значение'
            defaultValue={inputSolution.constraint_value2}
            name='constraint_value2'
            style={{width: "50px", height: "30px"}}
            type='number'
            {...register('constraint_value2')} 
          />

          <div style={{display: "flex"}}>
            <p style={{marginRight: "20px"}}>Начальные точки</p>
            <div style={{marginTop: "15px"}}>
              <Input
                placeholder='x1'
                defaultValue={inputSolution.x1_initial}
                name='x1_initial'
                style={{width: "50px", height: "30px"}}
                type='number'
                {...register('x1_initial')} 
              />
              <Input
                placeholder='x2'
                defaultValue={inputSolution.x2_initial}
                name='x2_initial'
                style={{width: "50px", height: "30px", marginLeft:"20px"}}
                type='number'
                {...register('x2_initial')} 
              />
            </div>
          </div>
          <div style={{display: "flex"}}>
            <p style={{marginRight: "20px"}}>Точность</p>
            <Input
                placeholder='0.0'
                
                defaultValue={inputSolution.epsilon}
                name='epsilon'
                style={{width: "70px", height: "30px", marginTop: "15px"}}
                type='string'
                {...register('epsilon')} 
            />
          </div>
          <div style={{display: "flex"}}>
            <p style={{marginRight: "5px"}}>Выбор метода</p>
            <Select id="fruits" name="method" defaultValue={inputSolution.method} {...register('method')} style={{width: "220px", marginTop: "15px",height: "30px"}}>
              <MenuItem value="1">Квадратичный штраф</MenuItem>
              {/* <MenuItem value="2">Method 2</MenuItem> */}
              <MenuItem value="3">Адаптивный штраф</MenuItem>
            </Select>
          </div>    
          <br/>
          <div style={{display: "flex", justifyContent:"space-between"}}>
            <Button className='test' type='submit' >Рассчитать</Button>
          </div>
        </form>
      </Card>
    )
}