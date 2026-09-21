default:
    echo 'Hello, world!'

# Sync the static site to the dcpython.org S3 bucket and invalidate CloudFront.
deploy:
    aws s3 sync . s3://dcpython.org/ \
        --exclude ".git/*" \
        --exclude ".github/*" \
        --exclude "node_modules/*" \
        --exclude "src/*" \
        --exclude ".envrc" \
        --exclude ".gitignore" \
        --exclude "package*.json" \
        --exclude "webpack.config.js" \
        --exclude "justfile" \
        --exclude "README.rst" \
        --exclude "*.md"
    aws cloudfront create-invalidation --distribution-id E315Y1FCSR1NT1 --paths "/*"
