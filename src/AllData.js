// React
import {useContext} from 'react';
// React Bootstrap
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
// Application
import { UserContext } from './App';

function AllData() {

  const context = useContext(UserContext);

  return (
    <div>
      {context.submissions.length === 0 && <Container className='text-danger'>No submissions yet.</Container>}
      {context.submissions.map( (submission, index) => {
        return (
          <Container key={`submissionIndex${index}`}>
            <Row className="justify-content-center mt-5">
              <Card style={{ width: '18rem' }}>
                <Card.Body>
                  <Card.Title>{`Submission No ${submission.submissionID}`}</Card.Title>
                  <hr/>
                  <Card.Text>
                    {`type: ${submission.type}`}
                  </Card.Text>
                  {Object.keys(submission.data).map( (dataKey, dataIndex) => {
                    return (
                      <Card.Text key={`datumIndex${dataIndex}`}>
                        {dataKey + ': ' + submission.data[dataKey]}
                      </Card.Text>
                    )
                  })}
                </Card.Body>
              </Card>
            </Row>
          </Container>
        )
      })}
    </div>
  );
}

export default AllData;