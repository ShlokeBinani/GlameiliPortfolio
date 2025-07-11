export default function Footer() {
  return (
    <footer className="bg-beige-400 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-ochre-700 mb-4">
              Glameili
            </h3>
            <p className="text-ochre-600">
              Premier Interior Décor Company
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div>
              <h4 className="text-lg font-semibold text-ochre-700 mb-2">
                Address
              </h4>
              <p className="text-ochre-600">
                26 Bangur Avenue<br />
                Kolkata-700055
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold text-ochre-700 mb-2">
                Email
              </h4>
              <p className="text-ochre-600">
                glameilidecor@gmail.com
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold text-ochre-700 mb-2">
                Phone
              </h4>
              <p className="text-ochre-600">
                9874042338
              </p>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-ochre-400">
            <p className="text-ochre-600">
              © 2024 Glameili. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
