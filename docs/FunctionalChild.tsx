import { ref } from 'vue';

const Child = function ChildFunctional() {
  const count = ref(0);

  return (
    <div>
      <p>{count.value}</p>
      <button onClick={() => count.value++}>点击增加count</button>
    </div>
  );
};

export default Child;
