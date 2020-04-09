<script>
import { shell } from 'electron';

export default {
  name: 'External',

  beforeRouteEnter(to) {
    const path = `https://laravel.com${to.path}`;

    alert(to.fullPath + "\n" + to.redirectedFrom + "\n" + path);

    shell.openExternal(path);
  },
};
</script>
