module.exports = `Certainly! Here’s the proof using the dollar and double dollar notation for mathematical expressions.
        
        To prove that the rotation (or curl) of the gradient of a scalar field \( f \) is zero, we need to show that:
        
        $$
        \nabla \times (\nabla f) = 0
        $$
        
        where \( \nabla \) is the del operator.
        
        ### Step 1: Define the Gradient
        
        The gradient of a scalar field \( f(x, y, z) \) in three-dimensional Cartesian coordinates is given by:
        
        $$
        \nabla f = \left( \frac{\partial f}{\partial x}, \frac{\partial f}{\partial y}, \frac{\partial f}{\partial z} \right)
        $$
        
        ### Step 2: Define the Curl
        
        The curl of a vector field \( \mathbf{F} = (F_1, F_2, F_3) \) is defined as:
        
        $$
        \nabla \times \mathbf{F} = \left( \frac{\partial F_3}{\partial y} - \frac{\partial F_2}{\partial z}, \frac{\partial F_1}{\partial z} - \frac{\partial F_3}{\partial x}, \frac{\partial F_2}{\partial x} - \frac{\partial F_1}{\partial y} \right)
        $$
        
        ### Step 3: Apply the Curl to the Gradient
        
        Now, we apply the curl operator to the gradient of \( f \):
        
        Let \( \mathbf{F} = \nabla f = \left( \frac{\partial f}{\partial x}, \frac{\partial f}{\partial y}, \frac{\partial f}{\partial z} \right) \).
        
        Calculating \( \nabla \times \nabla f \):
        
        1. **First Component**:
           $$
           \frac{\partial}{\partial y}\left(\frac{\partial f}{\partial z}\right) - \frac{\partial}{\partial z}\left(\frac{\partial f}{\partial y}\right)
           $$
           By the equality of mixed partial derivatives (Clairaut's theorem), this is equal to:
           $$
           \frac{\partial^2 f}{\partial y \partial z} - \frac{\partial^2 f}{\partial z \partial y} = 0
           $$
        
        2. **Second Component**:
           $$
           \frac{\partial}{\partial z}\left(\frac{\partial f}{\partial x}\right) - \frac{\partial}{\partial x}\left(\frac{\partial f}{\partial z}\right)
           $$
           Again, by the equality of mixed partial derivatives, this is equal to:
           $$
           \frac{\partial^2 f}{\partial z \partial x} - \frac{\partial^2 f}{\partial x \partial z} = 0
           $$
        
        3. **Third Component**:
           $$
           \frac{\partial}{\partial x}\left(\frac{\partial f}{\partial y}\right) - \frac{\partial}{\partial y}\left(\frac{\partial f}{\partial x}\right)
           $$
           By the equality of mixed partial derivatives, this is equal to:
           $$
           \frac{\partial^2 f}{\partial x \partial y} - \frac{\partial^2 f}{\partial y \partial x} = 0
           $$
        
        ### Step 4: Combine the Results
        
        Putting all the components together, we have:
        
        $$
        \nabla \times (\nabla f) = \left( 0, 0, 0 \right) = 0
        $$
        
        ### Conclusion
        
        Thus, we have proven that:
        
        $$
        \nabla \times (\nabla f) = 0
        $$
        
        This result holds for any scalar field \( f \) that has continuous second partial derivatives.`
        