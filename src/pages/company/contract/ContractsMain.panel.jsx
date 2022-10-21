import { Card, CardBody, CardHeader, Container } from "reactstrap";

import { BoxHeader } from "@/views/layout/headers";

export const ContractMainPanel = () => {
  return (
    <>
      <BoxHeader />S
      <Container className="mt--6" fluid>
        <Card className="mb-4">
          <CardHeader>
            <h3 className="mb-0">Contracts</h3>
          </CardHeader>
          <CardBody>Contracts go here...</CardBody>
        </Card>
      </Container>
    </>
  );
};
