document.addEventListener('DOMContentLoaded', () => {
  const calculateButton = document.getElementById('calculate');
  const resultDisplay = document.getElementById('result');
  const completeResult = document.getElementById('complete-result')
  const sphere1 = document.querySelector('.sphere1');
  const sphere2 = document.querySelector('.sphere2');

  // Função para resetar a animação das esferas
  // function resetAnimation() {
  //   // sphere1.style.transform = 'none';
  //   // sphere2.style.transform = 'none';
  //   sphere1.classList.remove('none');
  //   sphere2.classList.remove('none');

  //   sphere1.classList.remove('sphere-strong', 'sphere-medium', 'sphere-weak');
  //   sphere2.classList.remove('sphere-strong', 'sphere-medium', 'sphere-weak');
  // }

  sphere1.classList.add('none');
  sphere2.classList.add('none');
  sphere1.classList.remove('none');
  sphere2.classList.remove('none');


  calculateButton.addEventListener('click', () => {

    // Reset das animações
    sphere1.classList.add('none');
    sphere2.classList.add('none');

    // Remova classes CSS relacionadas à animação antes de adicioná-las novamente
    

    const q1 = parseFloat(document.getElementById('q1').value);
    const q1Prefix = document.getElementById('q1Prefix').value;
    const q2 = parseFloat(document.getElementById('q2').value);
    const q2Prefix = document.getElementById('q2Prefix').value;

    const distance = parseFloat(document.getElementById('distance').value) / 1000; // Converter mm para m

    // Verificar se os campos estão em branco

    const campoInput1 = document.getElementById('q1').value.trim()
    const campoInput2 = document.getElementById('q2').value.trim()

    const input1 = document.getElementById('q1')
    const input2 = document.getElementById('q2')

    if(campoInput1 === '') {
      alert('Campo obrigatório. Por favor, preencha o campo.')
      input1.focus()
    } else if(campoInput2 === '') {
      alert('Campo obrigatório. Por favor, preencha o campo.')
      input2.focus()
    } else {
      const q1Coulombs = q1 * Math.pow(10, -3 * (q1Prefix === 'm' ? 1 : (q1Prefix === 'u' ? 2 : (q1Prefix === 'n' ? 3 : 12))));
      const q2Coulombs = q2 * Math.pow(10, -3 * (q2Prefix === 'm' ? 1 : (q2Prefix === 'u' ? 2 : (q2Prefix === 'n' ? 3 : 12))));
  
      const k = 8.99 * Math.pow(10, 9); // Constante de Coulomb (N m^2 / C^2)
      const force = k * (q1Coulombs * q2Coulombs) / Math.pow(distance, 2);
  
      if (force == 0) {
        resultDisplay.innerHTML = `Módulo da Força Elétrica: <b>${force.toFixed(1)} N </b>
        <br> <p class='explanation'> Como uma das cargas é nula, não há força de interação entre duas cargas. </p>`
        completeResult.innerHTML = `Valor mais preciso: ${force} N`
      } else if (force > 1000 || force < 0.005) {
        resultDisplay.innerHTML = `Módulo da Força Elétrica: <b>${force.toExponential(2)} N </b>`
        completeResult.innerHTML = `Valor mais preciso: ${force} N`
        // console.log('type of to exponential', typeof(resultDisplay.textContent))
      } else {
        resultDisplay.innerHTML = `Módulo da Força Elétrica: <b>${force.toFixed(2)} N </b>`
        completeResult.innerHTML = `Valor mais preciso: ${force} N`
      }

      
      // Update sphere positions based on charges
      const q1Class = q1 > 0 ? 'proton' : 'electron';
      const q2Class = q2 > 0 ? 'proton' : 'electron';
      sphere1.className = `sphere sphere1 ${q1Class}`;
      sphere2.className = `sphere sphere2 ${q2Class}`;
      
  
      // A condição abaixo adiciona um + ou um - para as cargas, caso sejam postivas ou negativas
  
      if (sphere1.classList.contains('proton') && sphere2.classList.contains('electron')) {
        sphere1.innerHTML = '+'
        sphere2.innerHTML = '-'
      } else if (sphere1.classList.contains('electron') && sphere2.classList.contains('proton')) {
        sphere1.innerHTML = '-'
        sphere2.innerHTML = '+'
      } else if (sphere1.classList.contains('electron') && sphere2.classList.contains('electron')) {
        sphere1.innerHTML = '-'
        sphere2.innerHTML = '-'
      } else if (sphere1.classList.contains('proton') && sphere2.classList.contains('proton')) {
        sphere1.innerHTML = '+'
        sphere2.innerHTML = '+'
      } else {
        sphere1.innerHTML = ''
        sphere2.innerHTML = ''
      }

      
  
      // Animação das cargas elétricas:

      const moduleForce = Math.abs(force)
  
      if (moduleForce > 0) {
        const translation = 200; // Distância de movimento
        sphere1.classList.add('sphere-strong')
        sphere2.classList.add('sphere-strong')
        sphere1.style.transform = `translateX(calc(-100% - ${translation}px))`;
        sphere2.style.transform = `translateX(calc(100% + ${translation}px))`;

      } else if(moduleForce < 0 && moduleForce >= -100) {
        sphere1.classList.add('sphere-medium')
        sphere2.classList.add('sphere-medium')
        sphere1.style.transform = `translateX(calc(40%))`;
        sphere2.style.transform = `translateX(calc(-40%))`;
      
      } else if (moduleForce < -100) {
        sphere1.classList.add('sphere-weak')
        sphere2.classList.add('sphere-weak')
        sphere1.style.transform = `translateX(calc(40%))`;
        sphere2.style.transform = `translateX(calc(-40%))`;
      
      } else if (moduleForce === 0) {
        sphere1.classList.add('none')
        sphere2.classList.add('none')

      }
    }

  });
});
