<template>
  <aside class="sidebar">
    <a href="/" class="logo">
      <img class="mark" src="/img/logomark.min.svg" alt="Laravel">
      <img class="type" src="/img/logotype.min.svg" alt="Laravel">
    </a>
    <nav>
      <div class="navigation_contain" style="display: block;">
        <div class="docs_sidebar">
          <ul>
            <li>
              <h2>Prologue</h2>
              <ul>
                <li><a href="/docs/7.x/releases">Release Notes</a></li>
                <li><a href="/docs/7.x/upgrade">Upgrade Guide</a></li>
                <li><a href="/docs/7.x/contributions">Contribution Guide</a></li>
                <li><a href="/api/7.x">API Documentation</a></li>
              </ul>
            </li>
            <li>
              <h2>Getting Started</h2>
              <router-link to="/installation">
                Installation
              </router-link>
              <ul>
                <li><a href="/docs/7.x/installation">Installation</a></li>
                <li><a href="/docs/7.x/configuration">Configuration</a></li>
                <li><a href="/docs/7.x/structure">Directory Structure</a></li>
                <li><a href="/docs/7.x/homestead">Homestead</a></li>
                <li><a href="/docs/7.x/valet">Valet</a></li>
                <li><a href="/docs/7.x/deployment">Deployment</a></li>
              </ul>
            </li>
            <li>
              <h2>Architecture Concepts</h2>
              <ul>
                <li><a href="/docs/7.x/lifecycle">Request Lifecycle</a></li>
                <li><a href="/docs/7.x/container">Service Container</a></li>
                <li><a href="/docs/7.x/providers">Service Providers</a></li>
                <li><a href="/docs/7.x/facades">Facades</a></li>
                <li><a href="/docs/7.x/contracts">Contracts</a></li>
              </ul>
            </li>
            <li>
              <h2>The Basics</h2>
              <ul>
                <li><a href="/docs/7.x/routing">Routing</a></li>
                <li><a href="/docs/7.x/middleware">Middleware</a></li>
                <li><a href="/docs/7.x/csrf">CSRF Protection</a></li>
                <li><a href="/docs/7.x/controllers">Controllers</a></li>
                <li><a href="/docs/7.x/requests">Requests</a></li>
                <li><a href="/docs/7.x/responses">Responses</a></li>
                <li><a href="/docs/7.x/views">Views</a></li>
                <li><a href="/docs/7.x/urls">URL Generation</a></li>
                <li><a href="/docs/7.x/session">Session</a></li>
                <li><a href="/docs/7.x/validation">Validation</a></li>
                <li><a href="/docs/7.x/errors">Error Handling</a></li>
                <li><a href="/docs/7.x/logging">Logging</a></li>
              </ul>
            </li>
            <li>
              <h2>Frontend</h2>
              <ul>
                <li><a href="/docs/7.x/blade">Blade Templates</a></li>
                <li><a href="/docs/7.x/localization">Localization</a></li>
                <li><a href="/docs/7.x/frontend">Frontend Scaffolding</a></li>
                <li><a href="/docs/7.x/mix">Compiling Assets</a></li>
              </ul>
            </li>
            <li>
              <h2>Security</h2>
              <ul>
                <li><a href="/docs/7.x/authentication">Authentication</a></li>
                <li><a href="/docs/7.x/authorization">Authorization</a></li>
                <li><a href="/docs/7.x/verification">Email Verification</a></li>
                <li><a href="/docs/7.x/encryption">Encryption</a></li>
                <li><a href="/docs/7.x/hashing">Hashing</a></li>
                <li><a href="/docs/7.x/passwords">Password Reset</a></li>
              </ul>
            </li>
            <li>
              <h2>Digging Deeper</h2>
              <ul>
                <li><a href="/docs/7.x/artisan">Artisan Console</a></li>
                <li><a href="/docs/7.x/broadcasting">Broadcasting</a></li>
                <li><a href="/docs/7.x/cache">Cache</a></li>
                <li><a href="/docs/7.x/collections">Collections</a></li>
                <li><a href="/docs/7.x/events">Events</a></li>
                <li><a href="/docs/7.x/filesystem">File Storage</a></li>
                <li><a href="/docs/7.x/helpers">Helpers</a></li>
                <li><a href="/docs/7.x/http-client">HTTP Client</a></li>
                <li><a href="/docs/7.x/mail">Mail</a></li>
                <li><a href="/docs/7.x/notifications">Notifications</a></li>
                <li><a href="/docs/7.x/packages">Package Development</a></li>
                <li><a href="/docs/7.x/queues">Queues</a></li>
                <li><a href="/docs/7.x/scheduling">Task Scheduling</a></li>
              </ul>
            </li>
            <li>
              <h2>Database</h2>
              <ul>
                <li><a href="/docs/7.x/database">Getting Started</a></li>
                <li><a href="/docs/7.x/queries">Query Builder</a></li>
                <li><a href="/docs/7.x/pagination">Pagination</a></li>
                <li><a href="/docs/7.x/migrations">Migrations</a></li>
                <li><a href="/docs/7.x/seeding">Seeding</a></li>
                <li><a href="/docs/7.x/redis">Redis</a></li>
              </ul>
            </li>
            <li>
              <h2>Eloquent ORM</h2>
              <ul>
                <li><a href="/docs/7.x/eloquent">Getting Started</a></li>
                <li><a href="/docs/7.x/eloquent-relationships">Relationships</a></li>
                <li><a href="/docs/7.x/eloquent-collections">Collections</a></li>
                <li><a href="/docs/7.x/eloquent-mutators">Mutators</a></li>
                <li><a href="/docs/7.x/eloquent-resources">API Resources</a></li>
                <li><a href="/docs/7.x/eloquent-serialization">Serialization</a></li>
              </ul>
            </li>
            <li>
              <h2>Testing</h2>
              <ul>
                <li><a href="/docs/7.x/testing">Getting Started</a></li>
                <li><a href="/docs/7.x/http-tests">HTTP Tests</a></li>
                <li><a href="/docs/7.x/console-tests">Console Tests</a></li>
                <li><a href="/docs/7.x/dusk">Browser Tests</a></li>
                <li><a href="/docs/7.x/database-testing">Database</a></li>
                <li><a href="/docs/7.x/mocking">Mocking</a></li>
              </ul>
            </li>
            <li>
              <h2>Official Packages</h2>
              <ul>
                <li><a href="/docs/7.x/billing">Cashier (Stripe)</a></li>
                <li><a href="https://github.com/laravel/cashier-mollie">Cashier (Mollie)</a></li>
                <li><a href="/docs/7.x/dusk">Dusk</a></li>
                <li><a href="/docs/7.x/envoy">Envoy</a></li>
                <li><a href="/docs/7.x/horizon">Horizon</a></li>
                <li><a href="/docs/7.x/passport">Passport</a></li>
                <li><a href="/docs/7.x/sanctum">Sanctum</a></li>
                <li><a href="/docs/7.x/scout">Scout</a></li>
                <li><a href="/docs/7.x/socialite">Socialite</a></li>
                <li><a href="/docs/7.x/telescope">Telescope</a></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <div class="trigger_contain">
      <a href="#" class="nav_trigger" aria-label="Menu">
        <div class="bar"></div>
      </a>
    </div>
  </aside>
</template>

<script>
export default {
  name: 'Sidebar',
};
</script>
