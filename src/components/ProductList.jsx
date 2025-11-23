
import ProductCard from './ProductCard';
import { Container, Grid } from '@mui/material';

function ProductList({ products = []}) {
    
 if (!products || products.length === 0) {
    return (
      <Container sx={{ textAlign: 'center', py: 5 }}>
        No hay productos para mostrar.
      </Container>
    );
  }
    
    return (
        <Container>
            <Grid container spacing={3} justifyContent="center">
                {products.map((product) => (
                    <Grid key={product._id} item xs={12} sm={6} md={4}>
                        <ProductCard products={product} />
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}

export default ProductList;
