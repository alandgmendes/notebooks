// Este código opcional é usado para registrar um service worker.
// a função register() não é chamado por padrão.

// Isso permite que o aplicativo carregue mais rápido em visitas subsequentes na produção
// possui recursos offline. No entanto, também significa que os desenvolvedores (e usuários)
// só verá atualizações implantadas em visitas subsequentes a uma página, depois de todo o
// as guias existentes abertas na página foram fechadas, desde que previamente armazenadas em cache
// recursos são atualizados em segundo plano.

// Para saber mais sobre os benefícios deste modelo e instruções sobre como
// aceitar, leia https://bit.ly/CRA-PWA

const isLocalhost = Boolean(
  window.location.hostname === 'localhost' ||
  // [::1] is the IPv6 localhost address.
  window.location.hostname === '[::1]' ||
  // 127.0.0.0/8 are considered localhost for IPv4.
  window.location.hostname.match(
    /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
  )
);

export function register(config) {

  console.log('Referência ao seu ambiente =  ' + process.env.NODE_ENV);

  if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
    // O construtor de URL está disponível em todos os navegadores que suportam SW.
    const publicUrl = new URL(process.env.PUBLIC_URL, window.location.href);

    if (publicUrl.origin !== window.location.origin) {
      // Nosso service worker não funcionará se PUBLIC_URL estiver em uma origem diferente
      // de onde nossa página é veiculada. Isso pode acontecer se um CDN for usado para
      // servir ativos; consulte https://github.com/facebook/create-react-app/issues/2374
      return;
    }
    window.addEventListener('load', () => {
      // Sw personalizado para projeto
      const swUrl = `${process.env.PUBLIC_URL}/serviceworker.js`;
      console.log('Endereco service worker = ' + swUrl);

      if (isLocalhost) {
        // Se estiver sendo executado no localhost. Verificar se um service worker ainda existe ou não.
        checkValidServiceWorker(swUrl, config);

        // Adicionar algum registro adicional ao localhost, apontando os desenvolvedores para o
        // documentação do SW / PWA. 
        navigator.serviceWorker.ready.then(() => {
          console.log(
            'Este aplicativo da web está sendo servido primeiro em cache  por um sw ' +
            '. Para maiores informações, visite  https://bit.ly/CRA-PWA'
          );
        });
      } else {
        // Não é localhost, Registrar SW
        registerValidSW(swUrl, config);
      }
    });
  }
}

function registerValidSW(swUrl, config) {
  navigator.serviceWorker
    .register(swUrl)
    .then(registration => {
      registration.onupdatefound = () => {
        const installingWorker = registration.installing;

        

        if (installingWorker == null) {
          return;
        }
        installingWorker.onstatechange = () => {
          if (installingWorker.state === 'installed') {


            console.log(navigator.serviceWorker.controller);


            if (navigator.serviceWorker.controller) {
              // At this point, the updated precached content has been fetched,
              // but the previous service worker will still serve the older
              // content until all client tabs are closed.

              // Neste ponto, o conteúdo pré-armazenado atualizado foi buscado,
              // mas o service worker anterior ainda servirá o mais antigo conteudo
              // até que todas as guias do cliente sejam fechadas.
              console.log(
                'Novo conteúdo está disponível e será usado quando todos ' +
                'as abas forem fechadas. Veja em  https://bit.ly/CRA-PWA.'
              );

              // Execute callback
              if (config && config.onUpdate) {
                config.onUpdate(registration);
              }
            } else {
              // At this point, everything has been precached.
              // It's the perfect time to display a
              // "Content is cached for offline use." message.

              // Neste ponto, tudo foi pré-armazenado.
              // É o momento perfeito para exibir uma mensagem.: 
              // "O conteúdo é armazenado em cache para uso offline."
              console.log('O conteúdo é armazenado em cache para uso offline.');
              console.log('Config = ' + config);
              //console.log('Config on sucess ' + config.onSuccess);
          
              // Execute callback
              if (config && config.onSuccess) {
              
                config.onSuccess(registration);
              }
            }
          }
        };
      };
    })
    .catch(error => {
      console.error('Error during service worker registration:', error);
    });
}

function checkValidServiceWorker(swUrl, config) {
  // Verifique se o service worker pode ser encontrado. Se não for possível recarregar a página.
  fetch(swUrl, {
    headers: { 'Service-Worker': 'script' },
  })
    .then(response => {
      // Certifique-se de que o service worker exista e de que realmente estamos recebendo um arquivo JS.
      const contentType = response.headers.get('content-type');
      if (
        response.status === 404 ||
        (contentType != null && contentType.indexOf('javascript') === -1)
      ) {
        // Nenhum SW encontrado. Provavelmente um aplicativo diferente. Recarregue a página.
        navigator.serviceWorker.ready.then(registration => {
          registration.unregister().then(() => {
            window.location.reload();
          });
        });
      } else {
        // SW  encontrado. Prossiga normalmente.
        registerValidSW(swUrl, config);
      }
    })
    .catch(() => {
      console.log(
        'Nenhuma conexão de internet encontrada. O aplicativo está sendo executado no modo offline.'
      );
    });
}

export function unregister() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready
      .then(registration => {
        registration.unregister();
      })
      .catch(error => {
        console.error(error.message);
      });
  }
}
