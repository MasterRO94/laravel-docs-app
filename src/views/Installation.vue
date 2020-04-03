<template>
  <section class="docs_main" style="opacity: 1;">
    <h1>Installation</h1>
    <ul>
      <li><a href="#installation">Installation</a>
        <ul>
          <li><a href="#server-requirements">Server Requirements</a></li>
          <li><a href="#installing-laravel">Installing Laravel</a></li>
          <li><a href="#configuration">Configuration</a></li>
        </ul></li>
      <li><a href="#web-server-configuration">Web Server Configuration</a>
        <ul>
          <li><a href="#directory-configuration">Directory Configuration</a></li>
          <li><a href="#pretty-urls">Pretty URLs</a></li>
        </ul></li>
    </ul>
    <p><a name="installation"></a></p>
    <h2 id="installation"><a href="#installation">Installation</a></h2>
    <p><a name="server-requirements"></a></p>
    <h3 id="server-requirements"><a href="#server-requirements">Server Requirements</a></h3>
    <p>The Laravel framework has a few system requirements. All of these requirements are satisfied by the <a href="/docs/7.x/homestead">Laravel Homestead</a> virtual machine, so it's highly recommended that you use Homestead as your local Laravel development environment.</p>
    <p>However, if you are not using Homestead, you will need to make sure your server meets the following requirements:</p>
    <div class="content-list">
      <ul>
        <li>PHP &gt;= 7.2.5</li>
        <li>BCMath PHP Extension</li>
        <li>Ctype PHP Extension</li>
        <li>Fileinfo PHP extension</li>
        <li>JSON PHP Extension</li>
        <li>Mbstring PHP Extension</li>
        <li>OpenSSL PHP Extension</li>
        <li>PDO PHP Extension</li>
        <li>Tokenizer PHP Extension</li>
        <li>XML PHP Extension</li>
      </ul>
    </div>
    <p><a name="installing-laravel"></a></p>
    <h3 id="installing-laravel"><a href="#installing-laravel">Installing Laravel</a></h3>
    <p>Laravel utilizes <a href="https://getcomposer.org">Composer</a> to manage its dependencies. So, before using Laravel, make sure you have Composer installed on your machine.</p>
    <h4>Via Laravel Installer</h4>
    <p>First, download the Laravel installer using Composer:</p>
    <pre class=" language-php" data-initialized="true" data-gclp-id="0"><code class=" language-php">composer <span class="token keyword">global</span> <span class="token keyword">require</span> laravel<span class="token operator">/</span>installer</code></pre>
    <p>Make sure to place Composer's system-wide vendor bin directory in your <code class=" language-php"><span class="token variable">$PATH</span></code> so the laravel executable can be located by your system. This directory exists in different locations based on your operating system; however, some common locations include:</p>
    <div class="content-list">
      <ul>
        <li>macOS: <code class=" language-php"><span class="token variable">$HOME</span><span class="token operator">/</span><span class="token punctuation">.</span>composer<span class="token operator">/</span>vendor<span class="token operator">/</span>bin</code></li>
        <li>Windows: <code class=" language-php"><span class="token operator">%</span><span class="token constant">USERPROFILE</span><span class="token operator">%</span>\<span class="token package">AppData<span class="token punctuation">\</span>Roaming<span class="token punctuation">\</span>Composer<span class="token punctuation">\</span>vendor<span class="token punctuation">\</span>bin</span></code></li>
        <li>GNU / Linux Distributions: <code class=" language-php"><span class="token variable">$HOME</span><span class="token operator">/</span><span class="token punctuation">.</span>config<span class="token operator">/</span>composer<span class="token operator">/</span>vendor<span class="token operator">/</span>bin</code> or <code class=" language-php"><span class="token variable">$HOME</span><span class="token operator">/</span><span class="token punctuation">.</span>composer<span class="token operator">/</span>vendor<span class="token operator">/</span>bin</code></li>
      </ul>
    </div>
    <p>You could also find the composer's global installation path by running <code class=" language-php">composer <span class="token keyword">global</span> about</code> and looking up from the first line.</p>
    <p>Once installed, the <code class=" language-php">laravel <span class="token keyword">new</span></code> command will create a fresh Laravel installation in the directory you specify. For instance, <code class=" language-php">laravel <span class="token keyword">new</span> <span class="token class-name">blog</span></code> will create a directory named <code class=" language-php">blog</code> containing a fresh Laravel installation with all of Laravel's dependencies already installed:</p>
    <pre class=" language-php" data-initialized="true" data-gclp-id="1"><code class=" language-php">laravel <span class="token keyword">new</span> <span class="token class-name">blog</span></code></pre>
    <h4>Via Composer Create-Project</h4>
    <p>Alternatively, you may also install Laravel by issuing the Composer <code class=" language-php">create<span class="token operator">-</span>project</code> command in your terminal:</p>
    <pre class=" language-php" data-initialized="true" data-gclp-id="2"><code class=" language-php">composer create<span class="token operator">-</span>project <span class="token operator">--</span>prefer<span class="token operator">-</span>dist laravel<span class="token operator">/</span>laravel blog</code></pre>
    <h4>Local Development Server</h4>
    <p>If you have PHP installed locally and you would like to use PHP's built-in development server to serve your application, you may use the <code class=" language-php">serve</code> Artisan command. This command will start a development server at <code class=" language-php">http<span class="token punctuation">:</span><span class="token comment">//localhost:8000</span></code>:</p>
    <pre class=" language-php" data-initialized="true" data-gclp-id="3"><code class=" language-php">php artisan serve</code></pre>
    <p>More robust local development options are available via <a href="/docs/7.x/homestead">Homestead</a> and <a href="/docs/7.x/valet">Valet</a>.</p>
    <p><a name="configuration"></a></p>
    <h3 id="configuration"><a href="#configuration">Configuration</a></h3>
    <h4>Public Directory</h4>
    <p>After installing Laravel, you should configure your web server's document / web root to be the <code class=" language-php"><span class="token keyword">public</span></code> directory. The <code class=" language-php">index<span class="token punctuation">.</span>php</code> in this directory serves as the front controller for all HTTP requests entering your application.</p>
    <h4>Configuration Files</h4>
    <p>All of the configuration files for the Laravel framework are stored in the <code class=" language-php">config</code> directory. Each option is documented, so feel free to look through the files and get familiar with the options available to you.</p>
    <h4>Directory Permissions</h4>
    <p>After installing Laravel, you may need to configure some permissions. Directories within the <code class=" language-php">storage</code> and the <code class=" language-php">bootstrap<span class="token operator">/</span>cache</code> directories should be writable by your web server or Laravel will not run. If you are using the <a href="/docs/7.x/homestead">Homestead</a> virtual machine, these permissions should already be set.</p>
    <h4>Application Key</h4>
    <p>The next thing you should do after installing Laravel is set your application key to a random string. If you installed Laravel via Composer or the Laravel installer, this key has already been set for you by the <code class=" language-php">php artisan key<span class="token punctuation">:</span>generate</code> command.</p>
    <p>Typically, this string should be 32 characters long. The key can be set in the <code class=" language-php"><span class="token punctuation">.</span>env</code> environment file. If you have not copied the <code class=" language-php"><span class="token punctuation">.</span>env<span class="token punctuation">.</span>example</code> file to a new file named <code class=" language-php"><span class="token punctuation">.</span>env</code>, you should do that now. <strong>If the application key is not set, your user sessions and other encrypted data will not be secure!</strong></p>
    <h4>Additional Configuration</h4>
    <p>Laravel needs almost no other configuration out of the box. You are free to get started developing! However, you may wish to review the <code class=" language-php">config<span class="token operator">/</span>app<span class="token punctuation">.</span>php</code> file and its documentation. It contains several options such as <code class=" language-php">timezone</code> and <code class=" language-php">locale</code> that you may wish to change according to your application.</p>
    <p>You may also want to configure a few additional components of Laravel, such as:</p>
    <div class="content-list">
      <ul>
        <li><a href="/docs/7.x/cache#configuration">Cache</a></li>
        <li><a href="/docs/7.x/database#configuration">Database</a></li>
        <li><a href="/docs/7.x/session#configuration">Session</a></li>
      </ul>
    </div>
    <p><a name="web-server-configuration"></a></p>
    <h2 id="web-server-configuration"><a href="#web-server-configuration">Web Server Configuration</a></h2>
    <p><a name="directory-configuration"></a></p>
    <h3 id="directory-configuration"><a href="#directory-configuration">Directory Configuration</a></h3>
    <p>Laravel should always be served out of the root of the "web directory" configured for your web server. You should not attempt to serve a Laravel application out of a subdirectory of the "web directory". Attempting to do so could expose sensitive files present within your application.</p>
    <p><a name="pretty-urls"></a></p>
    <h3 id="pretty-urls"><a href="#pretty-urls">Pretty URLs</a></h3>
    <h4>Apache</h4>
    <p>Laravel includes a <code class=" language-php"><span class="token keyword">public</span><span class="token operator">/</span><span class="token punctuation">.</span>htaccess</code> file that is used to provide URLs without the <code class=" language-php">index<span class="token punctuation">.</span>php</code> front controller in the path. Before serving Laravel with Apache, be sure to enable the <code class=" language-php">mod_rewrite</code> module so the <code class=" language-php"><span class="token punctuation">.</span>htaccess</code> file will be honored by the server.</p>
    <p>If the <code class=" language-php"><span class="token punctuation">.</span>htaccess</code> file that ships with Laravel does not work with your Apache installation, try this alternative:</p>
    <pre class=" language-php" data-initialized="true" data-gclp-id="4"><code class=" language-php">Options <span class="token operator">+</span>FollowSymLinks <span class="token operator">-</span>Indexes
RewriteEngine On

RewriteCond <span class="token operator">%</span><span class="token punctuation">{</span><span class="token constant">HTTP</span><span class="token punctuation">:</span>Authorization<span class="token punctuation">}</span> <span class="token punctuation">.</span>
RewriteRule <span class="token punctuation">.</span><span class="token operator">*</span> <span class="token operator">-</span> <span class="token punctuation">[</span><span class="token constant">E</span><span class="token operator">=</span><span class="token constant">HTTP_AUTHORIZATION</span><span class="token punctuation">:</span><span class="token operator">%</span><span class="token punctuation">{</span><span class="token constant">HTTP</span><span class="token punctuation">:</span>Authorization<span class="token punctuation">}</span><span class="token punctuation">]</span>

RewriteCond <span class="token operator">%</span><span class="token punctuation">{</span><span class="token constant">REQUEST_FILENAME</span><span class="token punctuation">}</span> <span class="token operator">!</span><span class="token operator">-</span>d
RewriteCond <span class="token operator">%</span><span class="token punctuation">{</span><span class="token constant">REQUEST_FILENAME</span><span class="token punctuation">}</span> <span class="token operator">!</span><span class="token operator">-</span>f
RewriteRule <span class="token operator">^</span> index<span class="token punctuation">.</span>php <span class="token punctuation">[</span><span class="token constant">L</span><span class="token punctuation">]</span></code></pre>
    <h4>Nginx</h4>
    <p>If you are using Nginx, the following directive in your site configuration will direct all requests to the <code class=" language-php">index<span class="token punctuation">.</span>php</code> front controller:</p>
    <pre class=" language-php" data-initialized="true" data-gclp-id="5"><code class=" language-php">location <span class="token operator">/</span> <span class="token punctuation">{</span>
    try_files <span class="token variable">$uri</span> <span class="token variable">$uri</span><span class="token operator">/</span> <span class="token operator">/</span>index<span class="token punctuation">.</span>php<span class="token operator">?</span><span class="token variable">$query_string</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span></code></pre>
    <p>When using <a href="/docs/7.x/homestead">Homestead</a> or <a href="/docs/7.x/valet">Valet</a>, pretty URLs will be automatically configured.</p>
  </section>
</template>
