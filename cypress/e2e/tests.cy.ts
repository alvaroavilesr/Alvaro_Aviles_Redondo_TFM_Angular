describe('Tests de la aplicación', () => {

  describe('Página de inicio', () => {

    beforeEach(() => {
      cy.visit('http://localhost:4200/home')
    })

    describe('Verifica textos', () => {
      it('Debe mostrar parrafo de ¿Quienes somos?', () => {
        cy.contains('h2', '¿Quienes somos?').should('exist')
      })

      it('Debe mostrar parrafo de Nuestros productos', () => {
        cy.contains('h2', 'Nuestros productos').should('exist')
      })

      it('Debe mostrar parrafo de ¿Porque elegirnos?', () => {
        cy.contains('h2', '¿Porque elegirnos?').should('exist')
      })
    })

    describe('Verifica Imagenes', () => {
      it('Debe mostrar imagen 1', () => {
        cy.get('img[src="images/Moda.jpg"]').should('exist')
      })

      it('Debe mostrar imagen 2', () => {
        cy.get('img[src="images/Textil.jpg"]').should('exist')
      })
    })

    describe('Verifica Carrousel', () => {
      it('Debe mostrar el carrusel y sus controles', () => {
        cy.get('#carousel').should('be.visible')

        cy.get('#carousel .carousel-indicators button')
          .should('have.length', 3)

        cy.get('#carousel .carousel-control-prev').should('exist')
        cy.get('#carousel .carousel-control-next').should('exist')
      })

      it('Navega al siguiente slide y verifica el cambio', () => {
        cy.get('#carousel .carousel-item.active').then(($active) => {
          const firstSrc = $active.find('img').attr('src')

          cy.get('#carousel .carousel-control-next').click()

          cy.get('#carousel .carousel-item.active img').should(($img) => {
            expect($img.attr('src')).not.to.eq(firstSrc)
          })
        })
      })

      it('Navega al slide anterior y verifica el cambio', () => {
        cy.get('#carousel .carousel-item.active').then(($active) => {
          const currentSrc = $active.find('img').attr('src')

          cy.get('#carousel .carousel-control-prev').click()

          cy.get('#carousel .carousel-item.active img').should(($img) => {
            expect($img.attr('src')).not.to.eq(currentSrc)
          })
        })
      })
    })

    describe('Verifica Footer', () => {
      it('Debe mostrar el footer con el texto correcto', () => {
        cy.get('footer.bg-dark')
          .should('be.visible')
          .within(() => {
            cy.get('p.mb-0')
              .should('contain.text', '© 2025 The Clothing Hub, Inc')
          })
      })
    })

    describe('Verifica Navbar', () => {
      it('Debe mostrar el navbar con el título correcto', () => {
        cy.get('nav.navbar').should('be.visible')
        cy.get('nav.navbar .navbar-brand').should('contain.text', 'The Clothing Hub')
      })

      it('Debe mostrar los enlaces principales correctos', () => {
        const mainLinks = [
          { text: 'Home', href: '/home' },
          { text: 'Ayuda', href: '/help' },
          { text: 'Contacto', href: '/contact' },
          { text: 'Sobre nosotros', href: '/about' }
        ]

        mainLinks.forEach(link => {
          cy.get('nav.navbar ul.navbar-nav.me-auto li.nav-item a.nav-link')
            .contains(link.text)
            .should('have.attr', 'href', link.href)
        })
      })

      it('Debe mostrar los enlaces de usuario no logueado', () => {
        const userLinks = [
          { text: 'Login', href: '/login' },
          { text: 'Registro', href: '/register' }
        ]

        userLinks.forEach(link => {
          cy.get('nav.navbar ul#notLoggedMenu li.nav-item a.nav-link')
            .contains(link.text)
            .should('have.attr', 'href', link.href)
        })
      })

      it('Al hacer click en Ayuda navega a la página correcta', () => {
        cy.get('nav.navbar ul.navbar-nav.me-auto li.nav-item a.nav-link')
          .contains('Ayuda')
          .click()

        cy.url().should('include', '/help')
      })
    })
  })

  describe('Página de Ayuda', () => {

    beforeEach(() => {
      cy.visit('http://localhost:4200/help')
    })

    describe('Verifica textos', () => {
      it('Debe mostrar el título Ayuda', () => {
        cy.contains('h2', 'Ayuda').should('exist')
      })

      it('Debe mostrar persona de contacto', () => {
        cy.contains('p', 'Persona de contacto').should('exist')
      })

      it('Debe mostrar email de contacto', () => {
        cy.contains('p', 'Email de contacto').should('exist')
      })
    })

    describe('Verifica Footer', () => {
      it('Debe mostrar el footer con el texto correcto', () => {
        cy.get('footer.bg-dark')
          .should('be.visible')
          .within(() => {
            cy.get('p.mb-0')
              .should('contain.text', '© 2025 The Clothing Hub, Inc')
          })
      })
    })

    describe('Verifica Navbar', () => {
      it('Debe mostrar el navbar con el título correcto', () => {
        cy.get('nav.navbar').should('be.visible')
        cy.get('nav.navbar .navbar-brand').should('contain.text', 'The Clothing Hub')
      })

      it('Debe mostrar los enlaces principales correctos', () => {
        const mainLinks = [
          {text: 'Home', href: '/home'},
          {text: 'Ayuda', href: '/help'},
          {text: 'Contacto', href: '/contact'},
          {text: 'Sobre nosotros', href: '/about'}
        ]

        mainLinks.forEach(link => {
          cy.get('nav.navbar ul.navbar-nav.me-auto li.nav-item a.nav-link')
            .contains(link.text)
            .should('have.attr', 'href', link.href)
        })
      })

      it('Debe mostrar los enlaces de usuario no logueado', () => {
        const userLinks = [
          {text: 'Login', href: '/login'},
          {text: 'Registro', href: '/register'}
        ]

        userLinks.forEach(link => {
          cy.get('nav.navbar ul#notLoggedMenu li.nav-item a.nav-link')
            .contains(link.text)
            .should('have.attr', 'href', link.href)
        })
      })

      it('Al hacer click en Contacto navega a la página correcta', () => {
        cy.get('nav.navbar ul.navbar-nav.me-auto li.nav-item a.nav-link')
          .contains('Contacto')
          .click()

        cy.url().should('include', '/contact')
      })
    })
  })

  describe('Página de Contacto', () => {

    beforeEach(() => {
      cy.visit('http://localhost:4200/contact')
    })

    describe('Verifica textos', () => {
      it('Debe mostrar el título Contacto', () => {
        cy.contains('h2', 'Contacto').should('exist')
      })

      it('Debe mostrar persona de contacto', () => {
        cy.contains('p', 'Persona de contacto').should('exist')
      })

      it('Debe mostrar email de contacto', () => {
        cy.contains('p', 'Email de contacto').should('exist')
      })
    })

    describe('Verifica Footer', () => {
      it('Debe mostrar el footer con el texto correcto', () => {
        cy.get('footer.bg-dark')
          .should('be.visible')
          .within(() => {
            cy.get('p.mb-0')
              .should('contain.text', '© 2025 The Clothing Hub, Inc')
          })
      })
    })

    describe('Verifica Navbar', () => {
      it('Debe mostrar el navbar con el título correcto', () => {
        cy.get('nav.navbar').should('be.visible')
        cy.get('nav.navbar .navbar-brand').should('contain.text', 'The Clothing Hub')
      })

      it('Debe mostrar los enlaces principales correctos', () => {
        const mainLinks = [
          {text: 'Home', href: '/home'},
          {text: 'Ayuda', href: '/help'},
          {text: 'Contacto', href: '/contact'},
          {text: 'Sobre nosotros', href: '/about'}
        ]

        mainLinks.forEach(link => {
          cy.get('nav.navbar ul.navbar-nav.me-auto li.nav-item a.nav-link')
            .contains(link.text)
            .should('have.attr', 'href', link.href)
        })
      })

      it('Debe mostrar los enlaces de usuario no logueado', () => {
        const userLinks = [
          {text: 'Login', href: '/login'},
          {text: 'Registro', href: '/register'}
        ]

        userLinks.forEach(link => {
          cy.get('nav.navbar ul#notLoggedMenu li.nav-item a.nav-link')
            .contains(link.text)
            .should('have.attr', 'href', link.href)
        })
      })

      it('Al hacer click en Sobre nosotros navega a la página correcta', () => {
        cy.get('nav.navbar ul.navbar-nav.me-auto li.nav-item a.nav-link')
          .contains('Sobre nosotros')
          .click()

        cy.url().should('include', '/about')
      })
    })
  })

  describe('Página de Sobre Nosotros', () => {

    beforeEach(() => {
      cy.visit('http://localhost:4200/about')
    })

    describe('Verifica textos', () => {
      it('Debe mostrar el título Sobre Nosotros', () => {
        cy.contains('h2', 'Sobre nosotros').should('exist')
      })

      it('Debe mostrar parrafo', () => {
        cy.contains('p', 'Actualmente seguimos en crecimiento').should('exist')
      })
    })

    describe('Verifica Footer', () => {
      it('Debe mostrar el footer con el texto correcto', () => {
        cy.get('footer.bg-dark')
          .should('be.visible')
          .within(() => {
            cy.get('p.mb-0')
              .should('contain.text', '© 2025 The Clothing Hub, Inc')
          })
      })
    })

    describe('Verifica Imagenes', () => {
      it('Debe mostrar imagen 1', () => {
        cy.get('img[src="images/Sostenible.jpg"]').should('exist')
      })

      it('Debe mostrar imagen 2', () => {
        cy.get('img[src="images/Moda.jpg"]').should('exist')
      })
    })

    describe('Verifica Navbar', () => {
      it('Debe mostrar el navbar con el título correcto', () => {
        cy.get('nav.navbar').should('be.visible')
        cy.get('nav.navbar .navbar-brand').should('contain.text', 'The Clothing Hub')
      })

      it('Debe mostrar los enlaces principales correctos', () => {
        const mainLinks = [
          {text: 'Home', href: '/home'},
          {text: 'Ayuda', href: '/help'},
          {text: 'Contacto', href: '/contact'},
          {text: 'Sobre nosotros', href: '/about'}
        ]

        mainLinks.forEach(link => {
          cy.get('nav.navbar ul.navbar-nav.me-auto li.nav-item a.nav-link')
            .contains(link.text)
            .should('have.attr', 'href', link.href)
        })
      })

      it('Debe mostrar los enlaces de usuario no logueado', () => {
        const userLinks = [
          {text: 'Login', href: '/login'},
          {text: 'Registro', href: '/register'}
        ]

        userLinks.forEach(link => {
          cy.get('nav.navbar ul#notLoggedMenu li.nav-item a.nav-link')
            .contains(link.text)
            .should('have.attr', 'href', link.href)
        })
      })

      it('Al hacer click en Login navega a la página correcta', () => {
        cy.get('nav.navbar a.nav-link')
          .contains('Login')
          .click()

        cy.url().should('include', '/login')
      })
    })
  })

  describe('Página de Login', () => {

    beforeEach(() => {
      cy.visit('http://localhost:4200/login')
    })

    describe('Verifica formulario', () => {
      it('Debe mostrar el formulario de login', () => {
        cy.get('#loginForm').should('exist')
      })

      it('Debe mostrar el campo de nombre de usuario', () => {
        cy.get('input#username')
          .should('exist')
          .should('have.attr', 'placeholder', 'User1')
      })

      it('Debe permitir escribir en el campo de nombre de usuario', () => {
        cy.get('input#username')
          .type('usuarioTest')
          .should('have.value', 'usuarioTest')
      })

      it('Debe mostrar el campo de contraseña', () => {
        cy.get('input#password')
          .should('exist')
          .should('have.attr', 'placeholder', 'C0ntr@señ@')
      })

      it('Debe permitir escribir en el campo de contraseña', () => {
        cy.get('input#password')
          .type('123456')
          .should('have.value', '123456')
      })

      it('Debe mostrar el botón de login y permitir hacer clic', () => {
        cy.get('#btnLogin')
          .should('exist')
          .and('contain.text', 'Login')
          .click()
      })
    })

    describe('Verifica Accesos', () => {
      it('Debe mostrar toast de error con usuario', () => {
        cy.get('input#username')
          .type('User1')
        cy.get('input#password')
          .type('pass')
        cy.get('#btnLogin')
          .click()
        cy.get('#toast-container .ngx-toastr')
          .should('be.visible')
          .and('have.class', 'toast-error')
      })

      it('Debe acceder a la pagina de usuario', () => {
        cy.get('input#username')
          .type('User2')
        cy.get('input#password')
          .type('user@pass')
        cy.get('#btnLogin')
          .click()
        cy.wait(1000)
        cy.url().should('include', '/shop')
        cy.window().then((win) => {
          const token = win.sessionStorage.getItem('JWT')
          expect(token).to.exist
          expect(token).to.include('ey')
        })
      })

      it('Debe mostrar toast de error con vendedor', () => {
        cy.get('input#username')
          .type('Vendor1')
        cy.get('input#password')
          .type('pass')
        cy.get('#btnLogin')
          .click()
        cy.get('#toast-container .ngx-toastr')
          .should('be.visible')
          .and('have.class', 'toast-error')
      })

      it('Debe acceder a la pagina de vendedor', () => {
        cy.get('input#username')
          .type('Vendor1')
        cy.get('input#password')
          .type('vendor@pass')
        cy.get('#btnLogin')
          .click()
        cy.wait(1000)
        cy.url().should('include', '/category-management')
        cy.window().then((win) => {
          const token = win.sessionStorage.getItem('JWT')
          expect(token).to.exist
          expect(token).to.include('ey')
        })
      })

      it('Debe mostrar toast de error con administrador', () => {
        cy.get('input#username')
          .type('Admin11')
        cy.get('input#password')
          .type('pass')
        cy.get('#btnLogin')
          .click()
        cy.get('#toast-container .ngx-toastr')
          .should('be.visible')
          .and('have.class', 'toast-error')
      })

      it('Debe acceder a la pagina de administrador', () => {
        cy.get('input#username')
          .type('Admin1')
        cy.get('input#password')
          .type('admin@pass')
        cy.get('#btnLogin')
          .click()
        cy.wait(1000)
        cy.url().should('include', '/user-management')
        cy.window().then((win) => {
          const token = win.sessionStorage.getItem('JWT')
          expect(token).to.exist
          expect(token).to.include('ey')
        })
      })
    })
  })

  describe('Página de Registro', () => {

    beforeEach(() => {
      cy.visit('http://localhost:4200/register')
    })

    describe('Verifica formulario', () => {
      it('Debe mostrar todos los campos del formulario', () => {
        cy.get('form#registerForm').should('exist')

        const fields = [
          { id: '#username', type: 'text', placeholder: 'Usuario123' },
          { id: '#email', type: 'email', placeholder: 'name@example.com' },
          { id: '#name', type: 'email', placeholder: 'Alvaro' },
          { id: '#surname', type: 'email', placeholder: 'Aviles' },
          { id: '#password', type: 'password', placeholder: 'C0ntr@señ@' },
          { id: '#passwordConfirm', type: 'password', placeholder: 'C0ntr@señ@' }
        ]

        fields.forEach(field => {
          cy.get(field.id)
            .should('exist')
            .and('have.attr', 'type', field.type)
            .and('have.attr', 'placeholder', field.placeholder)
            .and('have.attr', 'required')
        })
      })

      it('Debe permitir escribir en los campos', () => {
        cy.get('#username').type('Usuario123').should('have.value', 'Usuario123')
        cy.get('#email').type('correo@ejemplo.com').should('have.value', 'correo@ejemplo.com')
        cy.get('#name').type('Álvaro').should('have.value', 'Álvaro')
        cy.get('#surname').type('Avilés').should('have.value', 'Avilés')
        cy.get('#password').type('C0ntr@señ@').should('have.value', 'C0ntr@señ@')
        cy.get('#passwordConfirm').type('C0ntr@señ@').should('have.value', 'C0ntr@señ@')
      })

      it('Debe tener un botón de registro visible', () => {
        cy.get('#btnRegister')
          .should('exist')
          .and('contain.text', 'Registrar')
          .and('have.attr', 'type', 'submit')
      })

      it('Debe validar el formulario si está vacío', () => {
        cy.get('#btnRegister').click()
        cy.get('form#registerForm:invalid').should('exist')
      })
    })

    describe('Verifica registro', () => {

      it('Debe crear nuevo usuario', () => {
        cy.get('#username').type('UserCypress')
        cy.get('#email').type('correo@ejemplo.com')
        cy.get('#name').type('Álvaro')
        cy.get('#surname').type('Avilés')
        cy.get('#password').type('C0ntr@señ@1')
        cy.get('#passwordConfirm').type('C0ntr@señ@1')
        cy.get('#btnRegister').click()
        cy.get('#toast-container .ngx-toastr')
          .should('be.visible')
          .and('have.class', 'toast-success')
      })
    })
  })

  describe('Página de Perfil de Administrador', () => {

    describe('Verifica formulario', () => {
      it('Debe ir a la pagina de perfil y comprobar el funcionamiento del formulario', () => {
        cy.visit('http://localhost:4200/login')
        cy.get('input#username')
          .type('Admin1')
        cy.get('input#password')
          .type('admin@pass')
        cy.get('#btnLogin')
          .click()
        cy.get('nav.navbar a.nav-link')
          .contains('Perfil')
          .click()
        cy.url().should('include', '/profile')
        cy.contains('h2', 'Tus datos personales').should('exist')
        cy.contains('label', 'Correo electrónico:')
          .should('be.visible')
        cy.contains('label', 'Nombre:')
          .should('be.visible')
        cy.contains('label', 'Apellido:')
          .should('be.visible')
        cy.contains('label', 'Contraseña:')
          .should('be.visible')
        cy.contains('button', 'Cambiar').click()
        cy.wait(1000)
        cy.contains('button', 'Cancelar').click()
        cy.contains('button', 'Cambiar').click()
        cy.get('input.form-control')
          .clear()
          .should('be.visible')
          .type('nuevo')
        cy.contains('button', 'Guardar Cambios').click()
        cy.get('#toast-container .ngx-toastr')
          .should('be.visible')
          .and('have.class', 'toast-error')
        cy.get('input.form-control')
          .clear()
          .should('be.visible')
          .type('nuevo@correo.com')
        cy.contains('button', 'Guardar Cambios').click()
        cy.wait(1000)
        cy.get('#toast-container .ngx-toastr')
          .should('be.visible')
          .and('have.class', 'toast-success')
        cy.contains('label', 'Nombre:')
          .parents('.row')
          .find('button')
          .click()
        cy.wait(1000)
        cy.contains('button', 'Cancelar').click()
        cy.contains('label', 'Nombre:')
          .parents('.row')
          .find('button')
          .click()
        cy.get('input.form-control')
          .clear()
          .should('be.visible')
          .type('NuevoNombre')
        cy.wait(500)
        cy.contains('button', 'Guardar Cambios').click()
        cy.get('#toast-container .ngx-toastr')
          .should('be.visible')
          .and('have.class', 'toast-success')
        cy.contains('label', 'Apellido:')
          .parents('.row')
          .find('button')
          .click()
        cy.wait(1000)
        cy.contains('button', 'Cancelar').click()
        cy.contains('label', 'Apellido:')
          .parents('.row')
          .find('button')
          .click()
        cy.get('input.form-control')
          .clear()
          .should('be.visible')
          .type('NuevoApellido')
        cy.wait(500)
        cy.contains('button', 'Guardar Cambios').click()
        cy.get('#toast-container .ngx-toastr')
          .should('be.visible')
          .and('have.class', 'toast-success')
        cy.contains('label', 'Contraseña:')
          .parents('.row')
          .find('button')
          .click()
        cy.wait(1000)
        cy.get('.modal-body input[type="password"]').eq(0).type('admin@pass')
        cy.get('.modal-body input[type="password"]').eq(1).type('admin@pass')
        cy.get('.modal-body input[type="password"]').eq(2).type('admin@pass')
        cy.contains('button', 'Guardar Cambios').click()
        cy.get('#toast-container .ngx-toastr')
          .should('be.visible')
          .and('have.class', 'toast-success')
      })
    })
  })


  describe('Página de gestión de Usuarios', () => {

    describe('Verifica funcionalidades', () => {
      it('Debe ir a la pagina de gestion de usuarios y comprobar el funcionamiento', () => {
        cy.visit('http://localhost:4200/login')
        cy.get('input#username')
          .type('Admin1')
        cy.get('input#password')
          .type('admin@pass')
        cy.get('#btnLogin')
          .click()
        cy.url().should('include', '/user-management')
        cy.contains('h2', 'Usuarios').should('exist')
        cy.contains('button', 'Crear usuario').click()
        cy.get('form').within(() => {
          cy.get('#username').should('be.visible').should('be.enabled').click().type('usuario123')
          cy.get('#firstname').should('be.visible').should('be.enabled').click().type('Juan')
          cy.get('#lastname').should('be.visible').should('be.enabled').click().type('Pérez')
          cy.get('#email').should('be.visible').should('be.enabled').click().type('juanperez@example.com')
          cy.get('#password').should('be.visible').should('be.enabled').click().type('C0ntr@señ@Segura')
          cy.get('#role').should('be.visible').should('be.enabled').select('Vendor')
        })
        cy.get('#CreateUserButton2').click()
        cy.get('#dropdownMenuButton').click()
        cy.wait(300)
        cy.get('#ButtonCategories').should('be.visible')
        cy.get('li a.dropdown-item').eq(1).click()
        cy.get('#dropdownMenuButton').click()
        cy.wait(300)
        cy.get('#ButtonCategories').should('be.visible')
        cy.get('li a.dropdown-item').first().click()
        cy.get('input[placeholder="Usuario..."]').type('Vendor1')
        cy.contains('button', 'Buscar').click()
        cy.get('#dropdownMenuButton').click()
        cy.wait(300)
        cy.get('#ButtonCategories').should('be.visible')
        cy.get('li a.dropdown-item').first().click()
        cy.contains('button', 'Modificar Datos').click()
        cy.get('#firstnameUpdate').clear().type('Pedro')
        cy.contains('button', 'Modificar datos').click()
        cy.contains('button', 'Modificar Contraseña').click()
        cy.get('#adminPass').should('be.visible').type('admin@pass')
        cy.get('#newPass').should('be.visible').type('admin@pass')
        cy.get('#newPassConfirm').should('be.visible').type('admin@pass')
        cy.contains('button', 'Modificar contraseña').click()
        cy.contains('button', 'Cambiar Rol').click()
        cy.get('#newRole').should('be.visible').select('Vendor')
        cy.contains('button', 'Modificar rol').should('be.visible').click()
        cy.get('body').click(10, 10)
        cy.get('body').click(10, 10)
        cy.get('body').click(10, 10)
        cy.get('body').click(10, 10)
        cy.contains('button', 'Eliminar').should('be.visible').click()
        cy.contains('button', 'Eliminar usuario').should('be.visible').click()
      })
    })

  })

  describe('Página de gestión de categorías', () => {

    describe('Verifica funcionalidades', () => {
      it('Debe ir a la pagina de gestion de categorias y comprobar el funcionamiento', () => {
        cy.visit('http://localhost:4200/login')
        cy.get('input#username')
          .type('Vendor1')
        cy.get('input#password')
          .type('vendor@pass')
        cy.get('#btnLogin')
          .click()
        cy.url().should('include', '/category-management')
        cy.contains('h2', 'Categorias').should('exist')
        cy.contains('button', 'Crear categoria').click()
        cy.get('form').within(() => {
          cy.get('#username').should('be.visible').should('be.enabled').type('Calcetines')
        })
        cy.get('#newCategoryName').click()
        cy.get('input[placeholder="Categoria..."]').type('Calcetines')
        cy.contains('button', 'Buscar').click()
        cy.contains('button', 'Modificar nombre').click()
        cy.get('#nameUpdate').clear().type('Zapatillas')
        cy.wait(300)
        cy.contains('button', 'Modificar datos').click()
        cy.get('input[placeholder="Categoria..."]').clear().type('Zapatillas')
        cy.contains('button', 'Buscar').click()
        cy.wait(300)
        cy.contains('button', 'Eliminar').click()
        cy.contains('button', 'Eliminar categoria').click()
      })
    })
  })

  describe('Página de gestión de productos', () => {
    it('Debe ir a la pagina de gestion de productos y comprobar el funcionamiento', () => {
      cy.visit('http://localhost:4200/login')
      cy.get('input#username')
        .type('Vendor1')
      cy.get('input#password')
        .type('vendor@pass')
      cy.get('#btnLogin')
        .click()
      cy.contains('a', 'Gestión de productos').click()
      cy.url().should('include', '/item-management')
      cy.contains('h2', 'Productos').should('exist')
      cy.contains('button', 'Crear producto').click()
      cy.get('form').within(() => {
        cy.get('#itemName').should('be.visible').should('be.enabled').click().type('Producto1')
        cy.get('#itemDescription').should('be.visible').should('be.enabled').click().type('Descripcion del producto')
        cy.get('#itemLongDescription').should('be.visible').should('be.enabled').click().type('Descripcion larga del producto')
        cy.get('#itemSize').should('be.visible').should('be.enabled').select('M')
        cy.get('#itemCategory').should('be.visible').should('be.enabled').select('Pantalones')
        cy.get('#itemPrice').should('be.visible').should('be.enabled').click().type('99')
        cy.get('#itemImage').should('be.visible').should('be.enabled').select('CamisaAzul.jpg')
      })
      cy.get('#CreateItemButton').click()
      cy.contains('button', 'Categoria').click()
      cy.contains('a.dropdown-item', 'Camisas').click()
      cy.contains('button', 'Categoria').click()
      cy.contains('a.dropdown-item', 'Cualquiera').click()
      cy.get('input[placeholder="Producto..."]').type('Producto1')
      cy.contains('button', 'Buscar').click()
      cy.contains('button', 'Ver detalles').click()
      cy.wait(500)
      cy.get('body').click(10, 10)
      cy.contains('button', 'Cerrar').click()
      cy.contains('button', 'Modificar datos').click()
      cy.get('#itemSizeUpdate').should('be.visible').should('be.enabled').select('M')
      cy.get('#UpdateItemData').click()
      cy.wait(500)
      cy.get('body').click(10, 10)
      cy.contains('button', 'Modificar categoria').click()
      cy.get('#newCategory').should('be.visible').should('be.enabled').select('Camisas')
      cy.wait(500)
      cy.get('body').click(10, 10)
      cy.contains('button', 'Eliminar').click()
      cy.get('#DeleteItemButton').click()
    })
  })

  describe('Página de gestión de pedidos', () => {
    it('Debe ir a la pagina de gestion de pedidos y comprobar el funcionamiento', () => {
      cy.visit('http://localhost:4200/login')
      cy.get('input#username')
        .type('Vendor1')
      cy.get('input#password')
        .type('vendor@pass')
      cy.get('#btnLogin')
        .click()
      cy.contains('a', 'Gestión de pedidos').click()
      cy.url().should('include', '/order-management')
      cy.contains('h2', 'Pedidos').should('exist')
      cy.get('input[placeholder="User1..."]').type('User2')
      cy.contains('button', 'Buscar').click()
      cy.contains('button', 'Ver detalles').click()
      cy.get('.modal-title').should('contain.text', 'Detalles pedido')
      cy.contains('Usuario:').should('exist')
      cy.contains('Precio:').should('exist')
      cy.contains('Total productos:').should('exist')
      cy.contains('Fecha:').should('exist')
      cy.contains('Dirección:').should('exist')
      cy.contains('Productos asociados').should('exist')
      cy.wait(500)
      cy.contains('button', 'Cerrar').should('be.visible').click()
      cy.get('body').click(10, 10)
      cy.contains('button', 'Eliminar').click()
      cy.contains('button', 'Eliminar pedido').click()
    })
  })

  describe('Página de Perfil de Vendedor', () => {

    describe('Verifica formulario', () => {
      it('Debe ir a la pagina de perfil y comprobar el funcionamiento del formulario', () => {
        cy.visit('http://localhost:4200/login')
        cy.get('input#username')
          .type('Vendor1')
        cy.get('input#password')
          .type('vendor@pass')
        cy.get('#btnLogin')
          .click()
        cy.get('nav.navbar a.nav-link')
          .contains('Perfil')
          .click()
        cy.url().should('include', '/profile')
        cy.contains('h2', 'Tus datos personales').should('exist')
        cy.contains('label', 'Correo electrónico:')
          .should('be.visible')
        cy.contains('label', 'Nombre:')
          .should('be.visible')
        cy.contains('label', 'Apellido:')
          .should('be.visible')
        cy.contains('label', 'Contraseña:')
          .should('be.visible')
        cy.contains('button', 'Cambiar').click()
        cy.wait(1000)
        cy.contains('button', 'Cancelar').click()
        cy.contains('button', 'Cambiar').click()
        cy.get('input.form-control')
          .clear()
          .should('be.visible')
          .type('nuevo')
        cy.contains('button', 'Guardar Cambios').click()
        cy.get('#toast-container .ngx-toastr')
          .should('be.visible')
          .and('have.class', 'toast-error')
        cy.get('input.form-control')
          .clear()
          .should('be.visible')
          .type('nuevo@correo.com')
        cy.contains('button', 'Guardar Cambios').click()
        cy.wait(1000)
        cy.get('#toast-container .ngx-toastr')
          .should('be.visible')
          .and('have.class', 'toast-success')
        cy.contains('label', 'Nombre:')
          .parents('.row')
          .find('button')
          .click()
        cy.wait(1000)
        cy.contains('button', 'Cancelar').click()
        cy.contains('label', 'Nombre:')
          .parents('.row')
          .find('button')
          .click()
        cy.get('input.form-control')
          .clear()
          .should('be.visible')
          .type('NuevoNombre')
        cy.wait(500)
        cy.contains('button', 'Guardar Cambios').click()
        cy.get('#toast-container .ngx-toastr')
          .should('be.visible')
          .and('have.class', 'toast-success')
        cy.contains('label', 'Apellido:')
          .parents('.row')
          .find('button')
          .click()
        cy.wait(1000)
        cy.contains('button', 'Cancelar').click()
        cy.contains('label', 'Apellido:')
          .parents('.row')
          .find('button')
          .click()
        cy.get('input.form-control')
          .clear()
          .should('be.visible')
          .type('NuevoApellido')
        cy.wait(500)
        cy.contains('button', 'Guardar Cambios').click()
        cy.get('#toast-container .ngx-toastr')
          .should('be.visible')
          .and('have.class', 'toast-success')
        cy.contains('label', 'Contraseña:')
          .parents('.row')
          .find('button')
          .click()
        cy.wait(1000)
        cy.get('.modal-body input[type="password"]').eq(0).type('vendor@pass')
        cy.get('.modal-body input[type="password"]').eq(1).type('vendor@pass')
        cy.get('.modal-body input[type="password"]').eq(2).type('vendor@pass')
        cy.contains('button', 'Guardar Cambios').click()
        cy.get('#toast-container .ngx-toastr')
          .should('be.visible')
          .and('have.class', 'toast-success')
      })
    })
  })

  describe('Página de Perfil de Usuario', () => {

    describe('Verifica formulario', () => {
      it('Debe ir a la pagina de perfil y comprobar el funcionamiento del formulario', () => {
        cy.visit('http://localhost:4200/login')
        cy.get('input#username')
          .type('User1')
        cy.get('input#password')
          .type('user@pass')
        cy.get('#btnLogin')
          .click()
        cy.get('nav.navbar a.nav-link')
          .contains('Perfil')
          .click()
        cy.url().should('include', '/profile')
        cy.contains('h2', 'Tus datos personales').should('exist')
        cy.contains('label', 'Correo electrónico:')
          .should('be.visible')
        cy.contains('label', 'Nombre:')
          .should('be.visible')
        cy.contains('label', 'Apellido:')
          .should('be.visible')
        cy.contains('label', 'Contraseña:')
          .should('be.visible')
        cy.contains('button', 'Cambiar').click()
        cy.wait(1000)
        cy.contains('button', 'Cancelar').click()
        cy.contains('button', 'Cambiar').click()
        cy.get('input.form-control')
          .clear()
          .should('be.visible')
          .type('nuevo')
        cy.contains('button', 'Guardar Cambios').click()
        cy.get('#toast-container .ngx-toastr')
          .should('be.visible')
          .and('have.class', 'toast-error')
        cy.get('input.form-control')
          .clear()
          .should('be.visible')
          .type('nuevo@correo.com')
        cy.contains('button', 'Guardar Cambios').click()
        cy.wait(1000)
        cy.get('#toast-container .ngx-toastr')
          .should('be.visible')
          .and('have.class', 'toast-success')
        cy.contains('label', 'Nombre:')
          .parents('.row')
          .find('button')
          .click()
        cy.wait(1000)
        cy.contains('button', 'Cancelar').click()
        cy.contains('label', 'Nombre:')
          .parents('.row')
          .find('button')
          .click()
        cy.get('input.form-control')
          .clear()
          .should('be.visible')
          .type('NuevoNombre')
        cy.wait(500)
        cy.contains('button', 'Guardar Cambios').click()
        cy.get('#toast-container .ngx-toastr')
          .should('be.visible')
          .and('have.class', 'toast-success')
        cy.contains('label', 'Apellido:')
          .parents('.row')
          .find('button')
          .click()
        cy.wait(1000)
        cy.contains('button', 'Cancelar').click()
        cy.contains('label', 'Apellido:')
          .parents('.row')
          .find('button')
          .click()
        cy.get('input.form-control')
          .clear()
          .should('be.visible')
          .type('NuevoApellido')
        cy.wait(500)
        cy.contains('button', 'Guardar Cambios').click()
        cy.get('#toast-container .ngx-toastr')
          .should('be.visible')
          .and('have.class', 'toast-success')
        cy.contains('label', 'Contraseña:')
          .parents('.row')
          .find('button')
          .click()
        cy.wait(1000)
        cy.get('.modal-body input[type="password"]').eq(0).type('user@pass')
        cy.get('.modal-body input[type="password"]').eq(1).type('user@pass')
        cy.get('.modal-body input[type="password"]').eq(2).type('user@pass')
        cy.contains('button', 'Guardar Cambios').click()
        cy.get('#toast-container .ngx-toastr')
          .should('be.visible')
          .and('have.class', 'toast-success')
      })
    })
  })

  describe('Página de tienda', () => {

    describe('Verifica funcionalidades', () => {
      it('Debe ir a la pagina de tienda y comprobar el funcionamiento', () => {
        cy.visit('http://localhost:4200/login')
        cy.get('input#username')
          .type('User1')
        cy.get('input#password')
          .type('user@pass')
        cy.get('#btnLogin')
          .click()
        cy.url().should('include', '/shop')
        cy.contains('h2', 'Productos').should('exist')
        cy.contains('button', 'Categoria').click()
        cy.contains('a.dropdown-item', 'Camisas').click()
        cy.contains('button', 'Categoria').click()
        cy.contains('a.dropdown-item', 'Cualquiera').click()
        cy.get('input[placeholder="Producto..."]').type('Gorra')
        cy.contains('button', 'Buscar').click()
        cy.contains('button', 'Ver detalles').click()
        cy.get('.modal-title').should('contain.text', 'Detalles producto')
        cy.contains('Gorra roja - 25€ - M').should('exist')
        cy.contains('Gorra roja básica').should('exist')
        cy.contains('Gorra roja básica. Fabrica en materiales de primera calidad, muy resistentes').should('exist')
        cy.get('img[src="/images/products/GorraRoja.jpg"]').should('be.visible')
        cy.wait(500)
        cy.contains('button', 'Cerrar').should('be.visible').click()
        cy.get('body').click(10, 10)
        cy.get('button:has(i.bi-cart-fill)').first().click()
        cy.get('#amount').type('2')
        cy.get('#ButtonAddToCart').click()
        cy.wait(500)
        cy.get('body').click(10, 10)
        cy.window().then((win) => {
          const token = win.sessionStorage.getItem('itemsAndAmountsCart')
          expect(token).to.exist
        })
      })
    })
  })

  describe('Página de carrito', () => {

    describe('Verifica funcionalidades', () => {
      it('Debe ir a la pagina de carrito y comprobar el funcionamiento', () => {
        cy.visit('http://localhost:4200/login')
        cy.get('input#username')
          .type('User1')
        cy.get('input#password')
          .type('user@pass')
        cy.get('#btnLogin')
          .click()
        cy.url().should('include', '/shop')
        cy.get('button:has(i.bi-cart-fill)').first().click()
        cy.get('#amount').type('2')
        cy.get('#ButtonAddToCart').click()
        cy.wait(500)
        cy.get('body').click(10, 10)
        cy.get('button:has(i.bi-cart-fill)').eq(1).click()
        cy.get('#amount').type('2')
        cy.get('#ButtonAddToCart').click()
        cy.wait(500)
        cy.get('body').click(10, 10)
        cy.get('nav.navbar a.nav-link')
          .contains('Carrito')
          .click()
        cy.contains('button', 'Ver detalles').click()
        cy.wait(500)
        cy.get('#CloseButton').click()
        cy.contains('button', 'Eliminar').click()
        cy.get('#DeleteFromCartButton').click()
        cy.wait(500)
        cy.get('body').click(10, 10)
        cy.contains('Hacer pedido').click()
        cy.get('#address').type('Calle 123')
        cy.get('#MakeOrderButton').click()
        cy.url().should('include', '/orderSummary')
        cy.contains('h2', '¡Muchas gracias por el pedido!').should('exist')
        cy.contains('h2', 'Aquí tienes un resumen').should('exist')
      })
    })
  })


  describe('Página de pedidos propios', () => {

    describe('Verifica funcionalidades', () => {
      it('Debe ir a la pagina de pedidos propios y comprobar el funcionamiento', () => {
        cy.visit('http://localhost:4200/login')
        cy.get('input#username')
          .type('User1')
        cy.get('input#password')
          .type('user@pass')
        cy.get('#btnLogin')
          .click()
        cy.url().should('include', '/shop')
        cy.get('nav.navbar a.nav-link')
          .contains('Mis pedidos')
          .click()
        cy.contains('h2', 'Mis pedidos').should('exist')
        cy.contains('button', 'Ver detalles').click()
        cy.get('.modal-title').should('exist')
        cy.contains('p', 'Usuario:').should('exist')
        cy.contains('p', 'Precio:').should('exist')
        cy.contains('p', 'Total productos:').should('exist')
        cy.contains('p', 'Fecha:').should('exist')
        cy.contains('p', 'Dirección:').should('exist')
        cy.get('h5').contains('Productos asociados').should('exist');
        cy.contains('button', 'Cerrar').click()
        cy.wait(500)
        cy.get('body').click(10, 10)
        cy.contains('button', 'Cancelar pedido').click()
        cy.contains('button', 'Eliminar pedido').click()
        cy.wait(500)
        cy.get('body').click(10, 10)
      })
    })
  })
})
