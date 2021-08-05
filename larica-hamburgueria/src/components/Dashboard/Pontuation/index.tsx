import axios from 'axios';
import React, { useEffect, useState } from "react";

import {
  Container,
  SuportContent,
} from "./styles";

export const Suport: React.FC = () => {
  const [persons, setPersons] = useState<any>([])

  useEffect(() => {
    
    axios.get('http://localhost:5014/pontuation')
    .then(res => {
      setPersons(res.data);
      }
    )
  }, []);

  console.log(typeof(persons));
  var personArray:any = Object.values(persons);

  console.log('resultado',personArray);
  // console.log('tester',result.map(p => p[0][0]));



  return (
    <Container>
      <SuportContent>
        {/* <span> { personArray.map(person => (<p>Cliente: { person[0].name } / Pontuação: {person[0].pontuation} / Desconto: {person[0].promotion} </p>)) }</span> */}
        <table>
        <tr>
          <th>Cliente</th>
          <th>Pontuação</th>
          <th>Desconto</th>
        </tr>
        <tbody>
        { personArray.map(person => ( <tr>
                                        <td>{ person[0].name }</td>
                                        <td>{ person[0].pontuation }</td>
                                        <td>{ person[0].promotion }</td>
                                      </tr> ))}
        </tbody>
      </table> 
      </SuportContent>
    </Container>
  );
};

export default Suport;
