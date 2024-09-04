import withAuth from "./withAuth";

interface RelationshipsFieldProps {
  productId: any;
}

const RelationshipsField: React.FC<RelationshipsFieldProps> = ({
  productId,
}) => {
  if (productId) {
    return <div>{productId}</div>;
  }
};

export default withAuth(RelationshipsField);
