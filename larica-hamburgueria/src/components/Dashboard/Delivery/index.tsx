import axios from 'axios';
import React, { useEffect, useState } from "react";

import {
  Container,
  SuportContent,
} from "./styles";

export const Suport: React.FC = () => {
  const [persons, setPersons] = useState<any>([])

  useEffect(() => {
    
    axios.get('http://localhost:5014/motoboys')
    .then(res => {
      setPersons(res.data);
      }
    )
  }, []);

  console.log(typeof(persons));
  var personArray:any = Object.values(persons);

  console.log('resultado',personArray);

  return (
    <Container>
      <SuportContent>
        {/* <span> { personArray.map(person => (<p>Motoboy: { person.name } / Disponivel: { String(person.avaiable) } / Capacidade: { person.capacity } / Cap. Disponivel: { person.capacity_avaiable }  </p>)) }</span> */}
        <table>
        <tr>
          <th>Motoboy</th>
          <th>Disponivel</th>
          <th>Capacidade</th>
          <th>Capacidade Disponivel</th>
        </tr>
        <tbody>
        { personArray.map(person => ( <tr>
                                        <td>{ person.name }</td>
                                        <td>{ String(person.avaiable) }</td>
                                        <td>{ person.capacity }</td>
                                        <td>{ person.capacity_avaiable }</td>
                                      </tr> ))}
        </tbody>
      </table> 
      </SuportContent>
    </Container>
  );
};

export default Suport;
