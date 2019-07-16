FROM node:8.11.4

ARG git_repository=''
ARG git_root=''
ARG git_user_email=''
ARG git_username=''
ARG git_password=''
ARG dist_git_repo=''

RUN git clone https://github.com/${git_root}/${git_repository}.git
    #Clone all the docs
RUN git clone https://github.com/${git_root}/${git_repository}.wiki.git && cp -r ./${git_repository}.wiki/. ./${git_repository}/docs/ && ls ./${git_repository}/docs/ && \
    cd /${git_repository}/website/ && yarn install && yarn build && cp -r ./build/ ../../build/ && cd ../.. && \
    git clone https://github.com/${git_root}/${dist_git_repo}.git && cd ./build && cp -r . ../${dist_git_repo}/ && cd ../${dist_git_repo} && ls &&\
        git config user.email ${git_user_email} && git add . && git commit -m $(git rev-parse HEAD) && \
            git push https://${git_username}:${git_password}@github.com/${git_root}/${dist_git_repo}.git --all

    
    #$(git rev-parse HEAD)
    #cp -r ./build/ ./marshhawk.github.io/ && cd marshhawkgithub.io && ls